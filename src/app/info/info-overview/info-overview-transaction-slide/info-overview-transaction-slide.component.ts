import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/_models/transaction.model';

@Component({
  selector: 'app-info-overview-transaction-slide',
  templateUrl: './info-overview-transaction-slide.component.html',
  styleUrls: ['./info-overview-transaction-slide.component.scss']
})
export class InfoOverviewTransactionSlideComponent {
  @Input() transaction?: Transaction

  colorMap: { [key: string]: string } = {
    '1': 'red',
    '2': 'orange',
    '3': 'amber',
    '4': 'yellow',
    '5': 'lime',
    '6': 'green',
    '7': 'emerald',
    '8': 'teal',
    '9': 'cyan',
    '0': 'sky',
    'a': 'blue',
    'b': 'indigo',
    'c': 'violet',
    'd': 'purple',
    'e': 'fuchsia',
    'f': 'pink',
  }


  // trick tailwind-css compiler to add all classes to compilation
  // from-red-900
  // to-red-900
  // from-orange-900
  // to-orange-900
  // from-amber-900
  // to-amber-900
  // from-yellow-900
  // to-yellow-900
  // from-lime-900
  // to-lime-900
  // from-green-900
  // to-green-900
  // from-emerald-900
  // to-emerald-900
  // from-teal-900
  // to-teal-900
  // from-cyan-900
  // to-cyan-900
  // from-sky-900
  // to-sky-900
  // from-blue-900
  // to-blue-900
  // from-indigo-900
  // to-indigo-900
  // from-violet-900
  // to-violet-900
  // from-purple-900
  // to-purple-900
  // from-fuchsia-900
  // to-fuchsia-900
  // from-pink-900
  // to-pink-900

  getClasses(transaction: any) {
    const classList = ['bg-gradient-to-br']

    const lastCharFrom = transaction.from ? transaction.from[transaction.from.length - 1] : '0'
    classList.push(`from-${this.colorMap[lastCharFrom]}-900`)

    const lastCharTo = transaction.to ? transaction.to[transaction.to.length - 1] : '0'
    classList.push(`to-${this.colorMap[lastCharTo]}-900`)

    return classList.join(' ')
  }

  cardClick(node: any) {
    window.open(`https://explorer.testnet.mantle.xyz/tx/${node.hash}`, '_blank')
  }

  getDate = (timestamp: number) => new Date(timestamp * 1000)
}
