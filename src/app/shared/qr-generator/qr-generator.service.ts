import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import QRCodeStyling from "qr-code-styling";

@Injectable({
    providedIn: 'root',
})
export class QRGeneratorService {
    generateQRCode(event: Event): QRCodeStyling | null {
        event.preventDefault();
    
        const id = crypto.randomUUID();
        //const baseUrl = 'https://romainbode.github.io/qr-plants';
        const baseUrl = 'http://localhost:4200/';
        const url = `${baseUrl}/${id}`;

        return new QRCodeStyling({
            width: 300,
            height: 300,
            data: url,
            image: '/assets/plant-logo.png',
            dotsOptions: {
                color: '#254026',
                type: 'rounded',
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                imageSize: 0.75,
                margin: 5
            },
        });
    }

    showQRCode(event: Event, id: string): QRCodeStyling | null {
        event.preventDefault();
    
        //const baseUrl = 'https://romainbode.github.io/qr-plants';
        const baseUrl = 'http://localhost:4200';
        const url = `${baseUrl}/${id}`;

        return new QRCodeStyling({
            width: 300,
            height: 300,
            data: url,
            image: 'assets/plant-logo.png',
            dotsOptions: {
                color: '#254026',
                type: 'rounded',
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                imageSize: 0.75,
                margin: 5
            },
        });
    }
}