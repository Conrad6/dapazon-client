import { Pipe, PipeTransform } from '@angular/core';
import { BigNumberish, formatEther } from 'ethers';

@Pipe({
  name: 'eth',
  standalone: true
})
export class EthPipe implements PipeTransform {

  transform(value: BigNumberish, ...args: unknown[]): string {
    const ans = formatEther(value) + ' ETH';
    return ans;
  }

}
