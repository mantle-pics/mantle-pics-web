import { Component, Input } from '@angular/core';
import { InfoService } from 'src/app/info/info.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {
  @Input() address?: string

  constructor(public infoService: InfoService) { }

  getType() {
    if (this.address) {
      if (this.infoService.activeAddress?.hash.toString() == this.address.toString()) {
        return 'you'
      }

      if (this.infoService.addressMap?.[this.address]?.contractCode) {
        return 'contract'
      }

      return 'wallet'
    }
    return 'none'
  }
}
