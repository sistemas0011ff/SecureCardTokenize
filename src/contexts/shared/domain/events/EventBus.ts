import { DomainEventMapping } from '../../infrastructure/eventBus';
import { DomainEvent } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

export interface EventBus {
  setDomainEventMapping(domainEventMapping: DomainEventMapping): void;
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
  start(): Promise<void>;
}
