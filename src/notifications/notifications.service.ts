import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Injectable()
export class NotificationsService {
  private pusher: Pusher;

  constructor(private configService: ConfigService) {
    this.pusher = new Pusher({
      appId: this.configService.get<string>('PUSHER_APP_ID'),
      key: this.configService.get<string>('PUSHER_KEY'),
      secret: this.configService.get<string>('PUSHER_SECRET'),
      cluster: this.configService.get<string>('PUSHER_CLUSTER'),
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    return this.pusher.trigger(channel, event, data);
  }
}
