import { Howl } from 'howler';
export default class Toast {
    constructor() {
        this.soundArpeggio = new Howl({
            src: ['/audio/arpeggio.mp3']
        });
        this.soundAlert = new Howl({
            src: ['/audio/alert1.mp3']
        });
    }
    async show(message, duration, audioUrl, url, target) {
        const toast = document.createElement('ion-toast');
        console.log(`Toast - message:${message}`);
        if (!toast.present) {
            console.log(`Toast cannot show, ion-toast not ready`);
            return;
        }
        toast.message = message;
        toast.position = 'bottom';
        toast.duration = duration || 5000;
        toast.buttons = [];
        if (url) {
            let buttonUrl = {
                text: 'View',
                handler: () => {
                    window.open(url, target || "_self");
                    // if(target){
                    //     window.open(url, target || "_self");
                    // }else{ 
                    //     location.href = url;
                    // }
                }
            };
            toast.buttons.push(buttonUrl);
        }

        let buttonDone = {
            text: 'X',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        }
        if (audioUrl) {
            try {
                if (audioUrl == "/audio/arpeggio.mp3")
                    this.soundArpeggio.play();
                else if (audioUrl == "/audio/alert1.mp3")
                    this.soundAlert.play();
                else
                    this.soundArpeggio.play();

            } catch (ex) {
                console.warn(ex);
            }
        }
        toast.buttons.push(buttonDone);
        document.body.appendChild(toast);
        return toast.present();
    }
    async presentToastWithOptions(header, message) {
        const toast = document.createElement('ion-toast');
        console.log(`Toast - header: ${header} message:${message}`);
        if (!toast.present) {
            console.log(`Toast cannot show, ion-toast not ready`);
            return;
        }
        toast.header = header;
        toast.message = message;
        toast.position = 'top';
        toast.buttons = [
            {
                side: 'start',
                icon: 'star',
                text: 'Favorite',
                handler: () => {
                    console.log('Favorite clicked');
                }
            }, {
                text: 'Done',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
        ];

        document.body.appendChild(toast);
        return toast.present();
    }
}