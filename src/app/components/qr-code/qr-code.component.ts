import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  template: `
    <div class="qr-container">
      <div *ngIf="isValidQrData; else noData">
        <qrcode [qrdata]="sanitizedQrData" [width]="256" [errorCorrectionLevel]="'M'" [elementType]="'canvas'">
        </qrcode>
      </div>
      <ng-template #noData>
        <div class="qr-placeholder">
          <ion-icon name="qr-code-outline" size="large"></ion-icon>
          <p>QR Code data not available</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .qr-container {
      display: flex;
      justify-content: center;
      margin: 1rem 0;
    }
    .qr-placeholder {
      padding: 2rem;
      text-align: center;
      color: #666;
      border: 1px dashed #ccc;
      border-radius: 8px;
      width: 256px;
      height: 256px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .qr-placeholder p {
      margin-top: 1rem;
    }
  `]
})
export class QrCodeComponent implements OnInit {
  @Input() qrData: string = '';
  sanitizedQrData: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  get isValidQrData(): boolean {
    return typeof this.qrData === 'string' && this.qrData.trim().length > 0;
  }

  ngOnInit() {
    this.validateAndSanitizeQrData();
  }

  ngOnChanges() {
    this.validateAndSanitizeQrData();
  }

  private validateAndSanitizeQrData() {
    if (!this.isValidQrData) {
      console.warn('QR Code data is empty or invalid');
      this.sanitizedQrData = '';
    } else {
      this.sanitizedQrData = this.qrData.trim();
    }
    this.cdr.detectChanges();
  }
}
