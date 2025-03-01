import { container } from "../../../../dependency-injection";
import { DomainEvent } from "../../domain/events/DomainEvent";
import { DomainEventSubscriber } from "../../domain/events/DomainEventSubscriber";


export const eventSubscribersRegistry = () => {
    const eventSubscribers = container.findTaggedServiceIds('domainEventSubscriber');
    const subscribers: DomainEventSubscriber<DomainEvent>[] = [];
    for(const {id} of eventSubscribers) {
        subscribers.push(container.get(id));
    }
    return subscribers;
};