# Graph Report - .  (2026-05-28)

## Corpus Check
- Large corpus: 71 files · ~1,666,759 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 248 nodes · 218 edges · 70 communities (34 shown, 36 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.89)
- Token cost: 2,594 input · 1,492 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Entry & Routing|App Entry & Routing]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_Data Layer & Auth|Data Layer & Auth]]
- [[_COMMUNITY_Battle Gameplay System|Battle Gameplay System]]
- [[_COMMUNITY_Component Hierarchy Diagram|Component Hierarchy Diagram]]
- [[_COMMUNITY_Page State Management|Page State Management]]
- [[_COMMUNITY_Sign-Up Validation|Sign-Up Validation]]
- [[_COMMUNITY_User Session & Progress|User Session & Progress]]
- [[_COMMUNITY_App Component Tree|App Component Tree]]
- [[_COMMUNITY_Coastal Stage Background|Coastal Stage Background]]
- [[_COMMUNITY_Castle Battlements Stage|Castle Battlements Stage]]
- [[_COMMUNITY_Medieval Fantasy Castle|Medieval Fantasy Castle]]
- [[_COMMUNITY_Monster AI & Combat Rules|Monster AI & Combat Rules]]
- [[_COMMUNITY_Mystical Forest Stage|Mystical Forest Stage]]
- [[_COMMUNITY_Auth Pages|Auth Pages]]
- [[_COMMUNITY_Level Data|Level Data]]
- [[_COMMUNITY_Skill Action Handler|Skill Action Handler]]
- [[_COMMUNITY_Password Update Flow|Password Update Flow]]
- [[_COMMUNITY_CSS Build Config|CSS Build Config]]
- [[_COMMUNITY_Hero Data|Hero Data]]
- [[_COMMUNITY_Monster Data|Monster Data]]
- [[_COMMUNITY_VS Code Config|VS Code Config]]
- [[_COMMUNITY_Vite Build Tool|Vite Build Tool]]
- [[_COMMUNITY_Project Manifest|Project Manifest]]
- [[_COMMUNITY_Back Navigation|Back Navigation]]
- [[_COMMUNITY_CalculateScreen Component|CalculateScreen Component]]
- [[_COMMUNITY_Delete Account Function|Delete Account Function]]
- [[_COMMUNITY_Stage 5 Background|Stage 5 Background]]
- [[_COMMUNITY_Stage 3 Background|Stage 3 Background]]
- [[_COMMUNITY_Charge Skill Icon|Charge Skill Icon]]
- [[_COMMUNITY_Attack Skill Icon|Attack Skill Icon]]
- [[_COMMUNITY_Defense Skill Icon|Defense Skill Icon]]
- [[_COMMUNITY_Mage Character|Mage Character]]
- [[_COMMUNITY_Wizard Character|Wizard Character]]
- [[_COMMUNITY_Lancer Character|Lancer Character]]
- [[_COMMUNITY_SwordMan Character|SwordMan Character]]
- [[_COMMUNITY_Merchant Character|Merchant Character]]
- [[_COMMUNITY_Dragon Monster|Dragon Monster]]
- [[_COMMUNITY_Jhin Monster|Jhin Monster]]
- [[_COMMUNITY_Medusa Monster|Medusa Monster]]
- [[_COMMUNITY_LizardMan Monster|LizardMan Monster]]
- [[_COMMUNITY_Demon Monster|Demon Monster]]
- [[_COMMUNITY_Right Nav Button|Right Nav Button]]
- [[_COMMUNITY_Back Nav Button|Back Nav Button]]
- [[_COMMUNITY_Left Nav Button|Left Nav Button]]
- [[_COMMUNITY_VueView Logo|VueView Logo]]
- [[_COMMUNITY_Coin Currency Icon|Coin Currency Icon]]
- [[_COMMUNITY_Full Card Frame|Full Card Frame]]
- [[_COMMUNITY_Half Card Frame|Half Card Frame]]
- [[_COMMUNITY_Visible Eye Icon|Visible Eye Icon]]
- [[_COMMUNITY_Hidden Eye Icon|Hidden Eye Icon]]

## God Nodes (most connected - your core abstractions)
1. `VueView Project Overview` - 19 edges
2. `LocalStorage User State Pattern` - 10 edges
3. `Stage 2 Background` - 10 edges
4. `App` - 9 edges
5. `userAccounts` - 7 edges
6. `Game Component` - 7 edges
7. `updateUser()` - 6 edges
8. `Validations` - 6 edges
9. `Game :level :character :beatStage` - 6 edges
10. `Stage 4 Background` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Heroes Static Data Array` --shares_data_with--> `userAccounts`  [INFERRED]
  src/data/heros.js → data/db.json
- `Levels Static Data Array` --shares_data_with--> `userAccounts`  [INFERRED]
  src/data/levels.js → data/db.json
- `addUser()` --references--> `userAccounts`  [INFERRED]
  src/libs/FetchAPI.js → data/db.json
- `deleteUser()` --references--> `userAccounts`  [INFERRED]
  src/libs/FetchAPI.js → data/db.json
- `getAllUsers()` --references--> `userAccounts`  [INFERRED]
  src/libs/FetchAPI.js → data/db.json

## Hyperedges (group relationships)
- **Sign-Up Validation Flow: SignUpValidations + Validations + FetchAPI** — libs_signupvalidations_checkvalidations, libs_validations_validations, libs_fetchapi_getallusers [EXTRACTED 1.00]
- **Session Lifecycle: main.js + router.js + FetchAPI updateUser** — src_main_appentry, src_router_routerconfig, libs_fetchapi_updateuser [EXTRACTED 1.00]
- **Combat Data Model: Heroes + Monsters + Levels** — data_heros_herosdata, data_monsters_monstersdata, data_levels_levelsdata [INFERRED 0.85]
- **Core Level Gameplay Components** — level_game_gamecomponent, level_actionbutton_actionbuttoncomponent, level_character_charactercomponent, level_healthbar_healthbarcomponent, level_actioncutscene_actioncutscenecomponent, level_pausescreen_pausescreencomponent [EXTRACTED 1.00]
- **Level Page Flow Orchestration** — pages_level_levelpage, level_levelselected_levelselectedcomponent, level_characterselected_characterselectedcomponent, level_game_gamecomponent, level_result_resultcomponent [EXTRACTED 1.00]
- **Auth Pages Sharing LocalStorage User State** — pages_login_loginpage, pages_signup_signuppage, pages_welcome_welcomepage, pages_setting_settingpage [INFERRED 0.95]

## Communities (70 total, 36 thin omitted)

### Community 0 - "App Entry & Routing"
Cohesion: 0.10
Nodes (26): Vue App Mount Point (#app), Main JS Entry Script, Vite SVG Favicon, VueView Turn-Based App Entry Point, Attack Button Action, Charge Button Action, Defense Button Action, Cartoon Art Style (+18 more)

### Community 1 - "Project Dependencies"
Cohesion: 0.10
Nodes (20): dependencies, json-server, vue, vue-router, devDependencies, autoprefixer, daisyui, postcss (+12 more)

### Community 2 - "Data Layer & Auth"
Cohesion: 0.14
Nodes (14): CharacterCard Display Component, Authentication Route Guard Concept, LocalStorage Session Management, userAccounts, Heroes Static Data Array, Levels Static Data Array, Monsters Static Data Array, addUser() (+6 more)

### Community 3 - "Battle Gameplay System"
Cohesion: 0.13
Nodes (18): Turn-Based Battle System, ActionButton Component, ActionCutscene Component, Character Component, CharacterCollection Component, CharacterSelected Component, calculateActionTurn Function, Enemy State (Game) (+10 more)

### Community 4 - "Component Hierarchy Diagram"
Cohesion: 0.13
Nodes (16): ActionButton @action :actionPoint :actionText :image :responsive, BackButton :path (CharacterSelected child), BackButton (Common), BackButton :path (Level child), CalculateScreen :attackChar :attackPoint :defensePoint :screenRatio :calculateWidth, Character :char :character :hitChar :hitDamage :screenRatio :calculateWidth (CharacterCollection child), Character :char :character :hitChar :hitDamage :screenRatio :calculateWidth (Game child), CharacterCard :herold (+8 more)

### Community 5 - "Page State Management"
Cohesion: 0.14
Nodes (3): user, router, routes

### Community 6 - "Sign-Up Validation"
Cohesion: 0.24
Nodes (6): getAllUsers(), checkValidations Method, SignUpValidations, checkUsername Static Method, minLength Static Method, Validations

### Community 7 - "User Session & Progress"
Cohesion: 0.18
Nodes (12): LocalStorage User State Pattern, Home Page, Inventory Page, finishStage Function, onLogin Function, confirmLogout Function (Setting), Setting Page, confirmBuy Function (Shop) (+4 more)

### Community 8 - "App Component Tree"
Cohesion: 0.18
Nodes (11): App, EditingAccount @close :updateUser, Home, HowToPlay, Inventory, Login, Setting, Shop (+3 more)

### Community 9 - "Coastal Stage Background"
Cohesion: 0.39
Nodes (9): Bamboo / Wooden Posts with Sprouts, Color Palette: Warm Browns, Ocean Blues, Golden Yellow, Soft Pinks, Warm Tropical Sunset Mood, Ocean / Sea Water, Outdoor Coastal Pier Scene, Sky with Clouds, Stage 2 Background, Sunset / Golden Sun on Horizon (+1 more)

### Community 10 - "Castle Battlements Stage"
Cohesion: 0.38
Nodes (7): Castle / Fortress Stage Theme, Castle Wall / Battlements, Mountain and Cloudy Sky Background, Stage 4 Background, Stone Brick Ledge (Top and Bottom), Stone Towers with Green Roofs, Wooden Plank Floor / Walkway

### Community 11 - "Medieval Fantasy Castle"
Cohesion: 0.40
Nodes (5): Castle Background, Visual Elements: Towers, Flags, Trees, Sky, Clouds, Adventurous Fairytale Mood, Medieval Fantasy Castle Setting, Cartoon/Illustrated Art Style

### Community 12 - "Monster AI & Combat Rules"
Cohesion: 0.60
Nodes (4): Turn-Based Combat System Concept, monsterEasy(), monsterHard(), HowToPlay Modal Component

### Community 13 - "Mystical Forest Stage"
Cohesion: 0.67
Nodes (4): Misty Forest Environment, Glowing Teal Water/Pool, Stage 1 Background, Wooden Platform Foreground Element

### Community 14 - "Auth Pages"
Cohesion: 0.67
Nodes (3): Login Page, SignUp Page, Welcome Page

## Knowledge Gaps
- **119 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+114 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `updateUser()` connect `Data Layer & Auth` to `Page State Management`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Level` connect `Component Hierarchy Diagram` to `App Component Tree`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Entry & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.09538461538461539 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Data Layer & Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Should `Battle Gameplay System` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._