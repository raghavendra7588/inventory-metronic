import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImgUrl'
})
export class FormatImgUrlPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.split('/').pop();
  }

}
