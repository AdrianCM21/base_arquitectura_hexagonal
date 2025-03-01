import EventEmitter from "events";
import { EventBus } from "../../domain/events/EventBus";
import { DomainEvent } from "../../domain/events/DomainEvent";
import { DomainEventSubscriber } from "../../domain/events/DomainEventSubscriber";

export class InMemoryEventBus extends EventEmitter implements EventBus{
    async publish(events: DomainEvent[]): Promise<void> {
        events.forEach(event => {
            this.emit(event.eventName, event);
        });
    }
    addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
        subscribers.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
    }

}