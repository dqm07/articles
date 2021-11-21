declare var foo: number;
declare function greet(greeting: string): void;
declare namespace myLib {
    let numberOfGreeting: number;
    function makeGreeting(s: string): string;
}
// declare function getWidget(n: number): Widget;
// declare function getWidget(s: string): Widget[]; 
type greetingLike = string | (() => string);
declare function greet(g :greetingLike): void;
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlterOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
declare namespace GreetingLib.Options {
    
}