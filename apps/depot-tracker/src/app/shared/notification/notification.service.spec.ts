import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import {
  MessageConfig,
  MessageTypeEnum,
  NotificationService,
} from './notification.service';
import SpyInstance = jest.SpyInstance;

describe('NotificationService', () => {
  let service: NotificationService;
  let publishMessagesSpy: SpyInstance;

  const msg01: MessageConfig = {
    type: MessageTypeEnum.info,
    texts: ['test01 message'],
  };
  const msg02: MessageConfig = {
    type: MessageTypeEnum.info,
    texts: ['test02 message'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);

    publishMessagesSpy = jest.spyOn<any, string>(service, 'publishMessages');

    service['messages'] = [msg01, msg02];
    expect(service['messages']).toHaveLength(2);
  });

  it('should have properties', () => {
    expect(service).toHaveProperty('publishMessages');
    expect(service).toHaveProperty('closeMessage');
    expect(service).toHaveProperty('closeAllMessages');
    expect(service).toHaveProperty('showMessage');
    expect(service).toHaveProperty('messages');
    expect(service).toHaveProperty('messages$');
    expect(service).toHaveProperty('messagesSubject');
  });

  it('should close all messages', () => {
    service.closeAllMessages();
    expect(service['messages']).toHaveLength(0);
    expect(publishMessagesSpy).toHaveBeenCalledTimes(1);
  });

  it('should close defined message', () => {
    service.closeMessage(msg01);
    expect(service['messages']).toHaveLength(1);
    expect(publishMessagesSpy).toHaveBeenCalledTimes(1);
  });

  it('should publish message and call close message on timeout', fakeAsync(() => {
    const closeMessageSpy = jest.spyOn<NotificationService, 'closeMessage'>(
      service,
      'closeMessage'
    );
    const timeout = 1000;
    service.showMessage(MessageTypeEnum.info, timeout, 'test03 message');
    expect(service['messages']).toHaveLength(3);
    expect(publishMessagesSpy).toHaveBeenCalledTimes(1);
    tick(timeout + 1);
    expect(closeMessageSpy).toHaveBeenCalledTimes(1);
    expect(service['messages']).toHaveLength(2);
    expect(publishMessagesSpy).toHaveBeenCalledTimes(2);
  }));
});
