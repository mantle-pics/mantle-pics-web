import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../_models/address.model';
import { Transaction } from '../_models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private _addressMap: { [key: string]: Address } = {}
  public get addressMap(): { [key: string]: Address } {
    return this._addressMap;
  }

  private _profileImageMap: { [key: string]: { url: string } } = {}
  public get profileImageMap(): { [key: string]: { url: string } } {
    return this._profileImageMap;
  }

  public activeAddress?: Address



  constructor(private http: HttpClient) {
    const accountImageMapStorage = localStorage.getItem('accountImageMap')
    if (accountImageMapStorage) {
      this._addressMap = JSON.parse(accountImageMapStorage)
    }

    const profileImageMapStorage = localStorage.getItem('profileImageMap')
    if (profileImageMapStorage) {
      this._profileImageMap = JSON.parse(profileImageMapStorage)
    }
  }

  getProfileImage = (address: string, regenerate = false): Promise<{ url: string }> => new Promise((resolve, reject) => {
    if (!regenerate && this._profileImageMap[address]) {
      resolve(this._profileImageMap[address]);
      return;
    }
    this.http.post(environment.profileImageApiUrl, {
      address,
      regenerate
    }).subscribe((result: any) => {
      this._profileImageMap[address] = result;
      localStorage.setItem('profileImageMap', JSON.stringify(this._profileImageMap));
      resolve(result)
    })
  })


  getAccountInfo = (address: string): Promise<any> => new Promise((resolve, reject) => {
    if (!address.startsWith('0x')) {
      address = '0x' + address
    }
    if (this._addressMap[address]) {
      resolve(this._addressMap[address]);
      return;
    }

    const query = `{
	address(hash: "${address}") {
	  contractCode
	  fetchedCoinBalance
	  fetchedCoinBalanceBlockNumber
	  hash,
    smartContract{
      abi,
      addressHash,
      compilerVersion,
      contractSourceCode,
      name,
      optimization
    }
	}
}`

    this.http.post(environment.mantleExplorer.graphQl, {
      query
    }).subscribe((result: any) => {
      this._addressMap[address] = result?.data?.address;
      localStorage.setItem('addressMap', JSON.stringify(this._addressMap));
      resolve(result?.data?.address)
    })
  })


  getTransactions = (address: string, page = 1): Promise<Transaction[]> => new Promise((resolve, reject) => {
    if (!address.startsWith('0x')) {
      address = '0x' + address
    }
    this.http.get(`${environment.mantleExplorer.api}?module=account&action=txlist&address=${address}&sort=desc&offset=10&page=${page}`).subscribe((result: any) => {
      console.log('getTransactions', result)
      resolve(result?.result)
    })
  })
  getTokenTransfers = (address: string, page = 1): Promise<Transaction[]> => new Promise((resolve, reject) => {
    if (!address.startsWith('0x')) {
      address = '0x' + address
    }
    this.http.get(`${environment.mantleExplorer.api}?module=account&action=tokentx&address=${address}&sort=desc&offset=10&page=${page}`).subscribe((result: any) => {
      console.log('getTokenTransfers', result)
      resolve(result?.result)
    })
  })

}
