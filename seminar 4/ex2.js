class Software {
  constructor(name) {
    this.name = name;
  }

  run() {
    console.log(`${this.name} is running`);
  }
}

class Plugin {
  constructor(name) {
    this.name = name;
  }

  activate() {
    console.log(`Plugin ${this.name} is activated`);
  }
}

class Browser extends Software {
  constructor(name) {
    super(name);
    this.plugins = [];
  }

  installPlugin(plugin) {
    this.plugins.push(plugin);
    console.log(`Installing ${plugin.name} in ${this.name}`);
  }

  run() {
    super.run();

    console.log("--- Activating plugins ---");
    this.plugins.forEach((element) => {
      element.activate();
    });
  }
}

console.log("=== Test 1: Browser fara plugin-uri ===");
const edge = new Browser("Edge");
edge.run();

console.log("\n=== Test 2: Browser cu un plugin ===");
const safari = new Browser("Safari");
safari.installPlugin(new Plugin("Tracker Blocker"));
safari.run();

console.log("\n=== Test 3: Browser cu multiple plugin-uri ===");
const opera = new Browser("Opera");
opera.installPlugin(new Plugin("VPN"));
opera.installPlugin(new Plugin("Ad Blocker"));
opera.installPlugin(new Plugin("Password Manager"));
opera.run();
// class Robot {
//     constructor(name) {
//         this.name = name

//     }

//     move() {
//         console.log(`${this.name} is moving`)
//     }

// }

// const r0 = new Robot('some robot')
// r0.move()

// class Weapon {
//     constructor(description) {
//         this.description = description
//     }

//     fire() {
//         console.log(`${this.description} is firing`)
//     }
// }

// const w0 = new Weapon('laser')
// w0.fire()

// class CombatRobot extends Robot {
//     constructor(name) {
//         super(name)
//         this.weapons = []
//     }

//     addWeapons(w) {
//         this.weapons.push(w)
//     }

//     fire() {
//         console.log('firing all weapons')
//         this.weapons.forEach(element => {
//             element.fire()
//         });
//     }
// }

// const r1 = new CombatRobot('some combat robot')
// r1.addWeapons(w0)
// r1.move()
// r1.fire()

// Robot.prototype.fly = function () {
//     console.log(`${this.name} is flying`)
// }

// r1.fly()
