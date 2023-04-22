import { EventEmitter } from 'events';

/**
 * A generic event emitter that can be used to emit and listen to events.
 */
export class Emitter<TEvents extends Record<string, unknown>> {
    private emitter = new EventEmitter();
    /**
     *
     * @param event - The event to emit
     * @param args - The arguments to pass to the event listeners
     * @returns
     */
    emit(
        event: keyof TEvents & string,
        ...args: TEvents[keyof TEvents][]
    ): boolean {
        return this.emitter.emit(event, ...args);
    }
    /**
     *
     * @param event - The event to listen to
     * @param listener - The listener to call when the event is emitted
     * @returns - The emitter instance
     */
    on(
        event: keyof TEvents & string,
        listener: (...args: TEvents[keyof TEvents][]) => void
    ): this {
        this.emitter.on(event, listener);
        return this;
    }
    /**
     *
     * @param event - The event to listen to
     * @param listener - The listener to call when the event is emitted
     * @returns - The emitter instance
     */
    off(
        event: keyof TEvents & string,
        listener: (...args: TEvents[keyof TEvents][]) => void
    ): this {
        this.emitter.off(event, listener);
        return this;
    }
}
