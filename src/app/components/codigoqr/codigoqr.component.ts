import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule         // CGV-Permite usar pipe 'translate'
    ],
})
export class CodigoqrComponent implements OnDestroy {
  user: User = new User();

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @Output() scanned: EventEmitter<string> = new EventEmitter<string>();
  @Output() stopped: EventEmitter<void> = new EventEmitter<void>();

  qrData: string = '';
  mediaStream: MediaStream | null = null; // Almacena el flujo de medios

  constructor(private auth: AuthService) 
  { 
    this.startQrScanningForWeb();
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }
 
  

  async startQrScanningForWeb() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = this.mediaStream;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    requestAnimationFrame(this.verifyVideo.bind(this));
  }

  async verifyVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.getQrData()) return;
      requestAnimationFrame(this.verifyVideo.bind(this));
    } else {
      requestAnimationFrame(this.verifyVideo.bind(this));
    }
  }

  getQrData(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode  | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      const data = qrCode.data;
      if (data !== '') {
        this.stopCamera();
        this.scanned.emit(qrCode.data);
        return true;
      }
    }
    return false;
  }

  stopQrScanning(): void {
    this.stopCamera();
    this.stopped.emit();
  }

  ngOnDestroy() {
    this.stopCamera();
  }


  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop()); // Detén todas las pistas de video
      this.mediaStream = null; // Limpia el flujo de medios
    }
  }
}
