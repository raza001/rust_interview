import { Category } from './types';

export const RUST_DATA: Category[] = [
  {
    id: 'basics',
    title: 'Basics & Variables',
    icon: 'Terminal',
    snippets: [
      {
        id: 'variables',
        title: 'Variables & Mutability',
        description: 'Variables are immutable by default in Rust to ensure safety.',
        tags: ['basic', 'let', 'mut'],
        code: `let x = 5; // Immutable
// x = 6; // Error!

let mut y = 10; // Mutable
y = 15; // OK

// Constants must be annotated
const MAX_POINTS: u32 = 100_000;

// Shadowing
let x = x + 1; // New 'x' shadows old 'x'`
      },
      {
        id: 'datatypes',
        title: 'Scalar Types',
        description: 'Native primitive types.',
        tags: ['types', 'int', 'float', 'bool'],
        code: `let a: i32 = 98222;      // Default Integer
let b: f64 = 2.718;      // Default Float
let c: bool = true;      // Boolean
let d: char = 'ℤ';       // Unicode Character
let tup: (i32, f64, u8) = (500, 6.4, 1); // Tuple
let arr: [i32; 5] = [1, 2, 3, 4, 5];     // Array (fixed size)`
      },
      {
        id: 'control_flow',
        title: 'Control Flow',
        description: 'If expressions and loops.',
        tags: ['if', 'loop', 'while'],
        code: `// If is an expression
let number = if condition { 5 } else { 6 };

// Loops
loop {
    println!("forever");
    break; // Exit loop
}

while n != 0 {
    n -= 1;
}

for element in a.iter() {
    println!("value: {}", element);
}`
      }
    ]
  },
  {
    id: 'ownership',
    title: 'Ownership & Borrowing',
    icon: 'ShieldCheck',
    snippets: [
      {
        id: 'move',
        title: 'Move Semantics',
        description: 'Ownership transfers for non-Copy types.',
        tags: ['move', 'heap'],
        code: `let s1 = String::from("hello");
let s2 = s1; 
// println!("{}", s1); // Error! s1 moved to s2

// Clone creates a deep copy
let s3 = s2.clone();
println!("s2: {}, s3: {}", s2, s3);

// Copy types (stack allocated) don't move
let x = 5;
let y = x; 
println!("{}", x); // OK`
      },
      {
        id: 'borrowing',
        title: 'References & Borrowing',
        description: 'Access data without taking ownership.',
        tags: ['borrow', 'ref'],
        code: `fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but value is not dropped

let s1 = String::from("hello");
let len = calculate_length(&s1); // Immutable borrow`
      },
      {
        id: 'slices',
        title: 'The Slice Type',
        description: 'References to a contiguous sequence of elements.',
        tags: ['slice', 'str'],
        code: `let s = String::from("hello world");

let hello: &str = &s[0..5];
let world: &str = &s[6..11];

let a = [1, 2, 3, 4, 5];
let slice: &[i32] = &a[1..3]; // &[2, 3]`
      }
    ]
  },
  {
    id: 'structs_enums',
    title: 'Structs & Enums',
    icon: 'Box',
    snippets: [
      {
        id: 'structs',
        title: 'Struct Definitions',
        description: 'Custom data types with named fields.',
        tags: ['struct', 'impl'],
        code: `struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

// Tuple Structs
struct Color(i32, i32, i32);

// Unit Structs
struct AlwaysEqual;`
      },
      {
        id: 'enums_match',
        title: 'Enums & Pattern Matching',
        description: 'Enums are algebraic data types.',
        tags: ['enum', 'match'],
        code: `enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);

match home {
    IpAddr::V4(a, b, c, d) => println!("{}.{}.{}.{}", a, b, c, d),
    IpAddr::V6(s) => println!("{}", s),
}`
      },
      {
        id: 'if_let',
        title: 'If Let',
        description: 'Concise control flow for single pattern matching.',
        tags: ['if let', 'flow'],
        code: `let config_max = Some(3u8);

if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
} else {
    println!("No maximum configured");
}`
      }
    ]
  },
  {
    id: 'error_handling',
    title: 'Error Handling',
    icon: 'AlertTriangle',
    snippets: [
      {
        id: 'result_option',
        title: 'Result & Option',
        description: 'Recoverable errors and optional values.',
        tags: ['Result', 'Option'],
        code: `enum Result<T, E> {
    Ok(T),
    Err(E),
}

enum Option<T> {
    Some(T),
    None,
}

// Usage
let f = File::open("hello.txt");
let f = match f {
    Ok(file) => file,
    Err(error) => panic!("Problem opening the file: {:?}", error),
};`
      },
      {
        id: 'question_mark',
        title: 'The ? Operator',
        description: 'Propagating errors concisely.',
        tags: ['?', 'propagation'],
        code: `fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}`
      },
      {
        id: 'unwrap_expect',
        title: 'Unwrap & Expect',
        description: 'Extracting values or panicking.',
        tags: ['unwrap', 'panic'],
        code: `let f = File::open("hello.txt").unwrap(); 
// Panics if Err

let f = File::open("hello.txt").expect("Failed to open hello.txt"); 
// Panics with message if Err`
      }
    ]
  },
  {
    id: 'traits_generics',
    title: 'Traits & Generics',
    icon: 'Layers',
    snippets: [
      {
        id: 'generics',
        title: 'Generic Functions',
        description: 'Abstracting over types.',
        tags: ['generic', 'T'],
        code: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}`
      },
      {
        id: 'traits',
        title: 'Defining & Implementing Traits',
        description: 'Shared behavior (interfaces).',
        tags: ['trait', 'impl'],
        code: `pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}", self.headline)
    }
}`
      },
      {
        id: 'trait_bounds',
        title: 'Trait Bounds (Where)',
        description: 'Constraining generics.',
        tags: ['where', 'bound'],
        code: `fn notify<T>(item: &T)
where
    T: Summary + Display,
{
    println!("Breaking news! {}", item.summarize());
}`
      }
    ]
  },
  {
    id: 'collections_iter',
    title: 'Collections & Iterators',
    icon: 'Hash',
    snippets: [
      {
        id: 'vectors',
        title: 'Vectors',
        description: 'Dynamic arrays.',
        tags: ['vec'],
        code: `let mut v = vec![1, 2, 3];
v.push(4);

// Accessing
match v.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}`
      },
      {
        id: 'hashmaps',
        title: 'HashMaps',
        description: 'Key-value storage.',
        tags: ['map', 'hash'],
        code: `use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

// Updating
scores.entry(String::from("Yellow")).or_insert(50);`
      },
      {
        id: 'iterators',
        title: 'Iterators & Closures',
        description: 'Functional programming patterns.',
        tags: ['iter', 'map', 'filter'],
        code: `let v1 = vec![1, 2, 3];

let v2: Vec<_> = v1.iter()
                  .map(|x| x + 1)
                  .filter(|x| x % 2 == 0)
                  .collect();

println!("{:?}", v2); // [2, 4]`
      }
    ]
  },
  {
    id: 'concurrency',
    title: 'Concurrency',
    icon: 'Zap',
    snippets: [
      {
        id: 'threads',
        title: 'Spawning Threads',
        description: 'Running code in parallel.',
        tags: ['thread', 'spawn'],
        code: `use std::thread;
use std::time::Duration;

let handle = thread::spawn(|| {
    for i in 1..10 {
        println!("hi number {} from the spawned thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
});

handle.join().unwrap();`
      },
      {
        id: 'channels',
        title: 'Message Passing',
        description: 'Channels for thread communication.',
        tags: ['mpsc', 'channel'],
        code: `use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let val = String::from("hi");
    tx.send(val).unwrap();
});

let received = rx.recv().unwrap();
println!("Got: {}", received);`
      },
      {
        id: 'mutex',
        title: 'Shared State (Mutex)',
        description: 'Thread-safe interior mutability.',
        tags: ['mutex', 'lock', 'arc'],
        code: `use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num += 1;
    });
    handles.push(handle);
}

// Wait for all
for handle in handles { handle.join().unwrap(); }`
      }
    ]
  },
  {
    id: 'smart_pointers',
    title: 'Smart Pointers',
    icon: 'Cpu',
    snippets: [
      {
        id: 'box',
        title: 'Box<T>',
        description: 'Allocate values on the heap.',
        tags: ['box', 'heap'],
        code: `let b = Box::new(5);
println!("b = {}", b);

// Recursive types
enum List {
    Cons(i32, Box<List>),
    Nil,
}`
      },
      {
        id: 'rc_arc',
        title: 'Rc<T> & Arc<T>',
        description: 'Reference Counting (Single vs Multi-threaded).',
        tags: ['rc', 'arc', 'shared'],
        code: `use std::rc::Rc;

let a = Rc::new(5);
let b = Rc::clone(&a); // Increments count

println!("Reference count: {}", Rc::strong_count(&a));`
      },
      {
        id: 'refcell',
        title: 'RefCell<T>',
        description: 'Interior Mutability pattern.',
        tags: ['refcell', 'interior'],
        code: `use std::cell::RefCell;

let x = RefCell::new(5);
// Mutate immutable reference at runtime
*x.borrow_mut() += 1; 

println!("{:?}", x);`
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Rust',
    icon: 'Briefcase',
    snippets: [
      {
        id: 'lifetimes',
        title: 'Lifetimes',
        description: 'Validating references at compile time.',
        tags: ['lifetime', "'a"],
        code: `// 'a connects the input lifetimes to the output lifetime
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}`
      },
      {
        id: 'async_await',
        title: 'Async / Await',
        description: 'Cooperative multitasking (Tokio style).',
        tags: ['async', 'await', 'future'],
        code: `async fn learn_song() -> String {
    "Song".to_string()
}

async fn async_main() {
    let song = learn_song().await;
    println!("{}", song);
}
// Requires an executor like tokio::main`
      },
      {
        id: 'macros',
        title: 'Declarative Macros',
        description: 'Metaprogramming with macro_rules!',
        tags: ['macro', 'metaprogramming'],
        code: `macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

fn main() {
    say_hello!("Rustacean");
}`
      }
    ]
  }
];