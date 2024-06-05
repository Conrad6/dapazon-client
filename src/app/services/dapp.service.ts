import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { Dappazon, DappazonNamespace } from '../../models';
import { AccountsChanged } from '../actions';
import abis from '../assets/abis.json';
import config from '../assets/config.json';

const ethereum = (window as any).ethereum as Eip1193Provider | undefined;


@Injectable()
export class DappService {
  private provider?: BrowserProvider;
  private dappazonInstance?: Dappazon;
  constructor(private store: Store) {
  }

  async getStoreListings() {
    this.assertProvider();

    const items: DappazonNamespace.ItemStruct[] = [];
    for (let i = 0; i < 9; i++) {
      const item = await this.dappazonInstance?.items(i + 1);
      if (!item) continue;
      items.push({
        id: item[0],
        name: item[1],
        category: item[2],
        image: item[3],
        cost: item[4],
        rating: item[5],
        stock: item[6]
      } as DappazonNamespace.ItemStruct);
    }

    return items;
  }

  private async assertProvider() {
    if (this.dappazonInstance && this.provider) return;
    if (!ethereum) throw new Error('No ethereum wallet provider installed. Please install a provider extension like MetaMask into your browser');
    const provider = new BrowserProvider(ethereum);
    this.provider = provider;

    // const network = await provider.getNetwork();
    this.dappazonInstance = new Contract(config.dappazonContract, abis, provider) as unknown as Dappazon;
  }

  monitorAccountChanges() {
    (ethereum as any | undefined)?.on('accountsChanged', (accounts: string[]) => {
      this.store.dispatch(new AccountsChanged(accounts, accounts[0]));
    });
  }

  async getAvailableAccounts() {
    if (!ethereum) throw new Error('No ethereum wallet provider installed. Please install a provider extension like MetaMask into your browser');
    const accounts = await ethereum?.request({ method: 'eth_requestAccounts' }) as string[];
    return accounts;
  }

}
