import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationModule } from './notification.module';
import { MessageTypeEnum, NotificationService } from './notification.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationModule],
      declarations: [],
    }).compileComponents();
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    notificationService = TestBed.inject(NotificationService);
  });

  describe('info (shared) message', () => {
    const text = 'info message text';
    beforeEach(() => {
      notificationService.showMessage(MessageTypeEnum.info, undefined, text);
      fixture.detectChanges();
    });

    it('should have class info', () => {
      const messageContainer = debugElement.query(By.css('#message_cont_0'));
      expect(messageContainer.classes['info']).toEqual(true);
    });

    it('should have button with click listener', () => {
      const button = debugElement.query(By.css('#button_0'));
      expect(button.listeners.filter((l) => l.name === 'click')).toHaveLength(
        1
      );
    });

    it('should have message text', () => {
      const message = debugElement.query(By.css('#message_0_text_0'));
      expect(message.nativeElement.textContent.trim()).toEqual(text);
    });
  });

  describe('success message', () => {
    const text = 'success message text';
    beforeEach(() => {
      notificationService.showMessage(MessageTypeEnum.success, undefined, text);
      fixture.detectChanges();
    });

    it('should have class success', () => {
      const messageContainer = debugElement.query(By.css('#message_cont_0'));
      expect(messageContainer.classes['success']).toEqual(true);
    });
  });

  describe('error message', () => {
    const text = 'error message text';
    beforeEach(() => {
      notificationService.showMessage(MessageTypeEnum.error, undefined, text);
      fixture.detectChanges();
    });

    it('should have class success', () => {
      const messageContainer = debugElement.query(By.css('#message_cont_0'));
      expect(messageContainer.classes['error']).toEqual(true);
    });
  });
});
