import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/_models/address.model';
import { Transaction, TransactionConnection } from 'src/app/_models/transaction.model';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-info-overview',
  templateUrl: './info-overview.component.html',
  styleUrls: ['./info-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoOverviewComponent implements OnInit {
  address?: string
  accountInfo?: any
  loading = true;
  profileUrl?: string
  currentPage = 1

  addressMap: { [key: string]: Address } = {}
  profileImageMap: { [key: string]: { url: string } } = {}
  requestedMoreDataMap: { [key: string]: boolean } = {}
  transactions?: Transaction[]

  constructor(
    private cdr: ChangeDetectorRef,
    private infoService: InfoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const address = params['address']
      if (address) {
        console.log(address)
        this.address = address
        delete this.profileUrl
        delete this.transactions


        this.getProfileImage(address, false)

        this.infoService.getAccountInfo(address).then(res => {
          console.log('accountInfo', res)
          this.accountInfo = res
          this.infoService.activeAddress = res
          this.cdr.detectChanges()
        })

        this.loading = true
        Promise.all([
          this.infoService.getTransactions(address),
          // this.infoService.getTokenTransfers(this.address) 
          // commented out due to a bug in the mantle explorer api
          // that causes paging is not possible and this request loading endlessly
        ]).then((res) => {
          this.handleTransactions(res)
        })
      }
    })

  }

  getProfileImage(address: string, regenerate = false) {
    if (regenerate) {
      delete this.profileUrl
      this.cdr.detectChanges()
    }
    this.infoService.getProfileImage(address, regenerate).then(res => {
      console.log('profileImage', res)

      this.profileUrl = res.url
      this.cdr.detectChanges()
    })
  }


  handleTransactions(res: Transaction[][]) {
    console.log('transactions', res)

    const transactions = res.flat().sort((a, b) => b.timeStamp - a.timeStamp)

    for (let transaction of transactions) {
      this.requestMoreData(transaction.from)
      this.requestMoreData(transaction.to)
    }

    if (this.transactions) {
      this.transactions = this.transactions.concat(transactions).sort((a, b) => b.timeStamp - a.timeStamp)
    } else {
      this.transactions = transactions
    }

    this.loading = false
    this.cdr.detectChanges()


  }

  requestMoreData(address: string) {
    if (!this.requestedMoreDataMap[address]) {
      this.requestedMoreDataMap[address] = true
      this.infoService.getAccountInfo(address).then(res => {
        this.addressMap[address] = res
        this.cdr.detectChanges()
      })
      this.infoService.getProfileImage(address).then(res => {
        this.profileImageMap[address] = res
        this.cdr.detectChanges()
      })
    }
  }

  download() {
    if (this.profileUrl) {
      window.open(this.profileUrl, '_blank')
    }
  }

  onElementScroll(event: any) {
    if (this.address && !this.loading && event.target.scrollHeight - (3 * event.target.clientHeight) < event.target.scrollTop) {
      console.log('load next')
      ++this.currentPage
      this.loading = true
      Promise.all([
        this.infoService.getTransactions(this.address, this.currentPage),
        // this.infoService.getTokenTransfers(this.address, this.currentPage) 
        // commented out due to a bug in the mantle explorer api
        // that causes paging is not possible and this request loading endlessly
      ]).then((res) => {
        this.handleTransactions(res)
      })
    }
  }

}
