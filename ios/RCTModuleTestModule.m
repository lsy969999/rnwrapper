//
//  RCTModuleTestModule.m
//  rnwrapper
//
//  Created by SY L on 12/10/23.
//

#import <Foundation/Foundation.h>
#import "RCTModuleTestModule.h"
#import <React/RCTLog.h>
@implementation RCTModuleTestModule

RCT_EXPORT_MODULE(ModuleTestModule);

RCT_EXPORT_METHOD(createTestLogEvent:(NSString *)prefix text:(NSString *)text)
{
  RCTLogInfo(@" %@_ createTestLogEvent: %@", prefix, text);
}

RCT_EXPORT_METHOD(createTestPromiseEvent:(NSString *)text
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@" ModuleTestModule_ createTestLogEvent: %@", text);
  @try{
    NSString *result = [NSString stringWithFormat:@"%@%@", text, @"from ios"];
    resolve(result);
  }@catch(NSException *ex){
    NSString *errorMessage = [ex description];
    reject(@"event_failure", errorMessage, nil);
  }
}

RCT_EXPORT_METHOD(createTestPromiseRejectEvent:(NSString *)text
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@" ModuleTestModule_ createTestPromiseRejectEvent: %@", text);
  @try{
    NSException *exception = [NSException exceptionWithName:@"Test" reason:@"Some reason for the exception" userInfo:nil];
    @throw exception;
  }@catch(NSException *ex){
    NSString *errorMessage = [ex name];
    reject(@"event_failure", errorMessage, nil);
  }
}

RCT_EXPORT_METHOD(createTestSendEvent)
{
  RCTLogInfo(@" ModuleTestModule_ createTestSendEvent");
  [self sendEventWithName:@"EventReminder" body:@{@"eventProperty": @"someValue"}];
}

//// Will be called when this module's first listener is added.
//-(void)startObserving {
//    hasListeners = YES;
//    // Set up any upstream listeners or background tasks as necessary
//}
//
//// Will be called when this module's last listener is removed, or on dealloc.
//-(void)stopObserving {
//    hasListeners = NO;
//    // Remove upstream listeners, stop unnecessary background tasks
//}
//
//- (void)calendarEventReminderReceived:(NSNotification *)notification
//{
//  NSString *eventName = notification.userInfo[@"name"];
//  if (hasListeners) {// Only send events if anyone is listening
//    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
//  }
//}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventReminder"];
}
@end
