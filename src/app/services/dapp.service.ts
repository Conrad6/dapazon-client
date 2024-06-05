import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BigNumberish, BrowserProvider, Contract, Eip1193Provider } from 'ethers';
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

  async doBuyProduct(itemId: BigNumberish, itemCost: BigNumberish) {
    await this.assertProvider();
    const signer = await this.provider?.getSigner();
    const transaction = await this.dappazonInstance?.connect(signer).buy(itemId, { value: itemCost });
    await transaction?.wait();
  }

  async findCustomerOrder(itemId: BigNumberish) {
    await this.assertProvider();

    const account = await this.provider?.getSigner().then(signer => signer.getAddress());
    const events = await this.dappazonInstance?.queryFilter(this.dappazonInstance.filters.Buy);
    const orders = events?.filter(event => event.args.buyer == account && event.args.itemId.toString() == itemId);

    if (!orders) return [];

    return await Promise.all(orders.map(event => this.dappazonInstance!.orders(String(account), event.args.orderId).then(order => {
      return {
        item: {
          category: order.item.category,
          cost: order.item.cost.toString(),
          id: order.item.id.toString(),
          rating: order.item.rating.toString(),
          image: order.item.image,
          name: order.item.name,
          stock: order.item.stock.toString(),
        },
        time: ((order.time as bigint) * 1000n).toString()
      } as { time: BigNumberish, item: DappazonNamespace.ItemStruct };
    })));

  }

  async getStoreListings() {
    await this.assertProvider();

    const items: DappazonNamespace.ItemStruct[] = [];
    for (let i = 0; i < 9; i++) {
      const item = await this.dappazonInstance?.items(i + 1);
      if (!item) continue;
      items.push({
        id: item.id.toString(),
        name: item.name,
        category: item.category,
        image: item.image,
        cost: item.cost.toString(),
        rating: item.rating.toString(),
        stock: item.stock.toString()
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
