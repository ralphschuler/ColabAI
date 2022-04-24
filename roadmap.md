## Milestones
- [ ] Implement Exception Tracking (Sentry.IO)
- [ ] Implement decision tree
- [ ] Setup spawning behavior
- [ ] Setup Harvesting & Controller Upgrading
- [ ] Setup Builder

## NPM packages
- https://www.npmjs.com/package/screeps-profiler

## Requirements
- Automated Creep Spawning
- Coordinating Spawn/Actions

- Global Decision Tree
  > Rooms and Creeps will decide their next action based on their decision tree

  DecisionTree
    .IF(ENERGY)

filmee24@gmail.com

- Flags
  > are used to mark rooms energy sources and other type of action
- Room States
  > Initializing, Defending, more?
- Creep Roles
  - Harvester
    > harvest energy and brings it back to spawn until hauler units can be build
  - Hauler
    > collect energy from harvesters and refills the spawn, storage containers and turrets
  - Upgrader / Builder
    > builds construction sites or upgrades the controller
  - Scout
    > moves to neighbort rooms and flags them
  - Defender
  - Healer
    > heals wounded creeps
