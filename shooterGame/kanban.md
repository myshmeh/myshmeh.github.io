<!-- 
    theme: JUNK WITH DIGNITY
      player rides on a beat up old spaceship that's been used for a long time.
      if player takes a damage, player dies.
    user story:
    1. start a scene
    2. loop (beat a boss) :
       1. dodge enemy bullets
       2. if (!dodged)
          1. take a damage
       3. attack enemies
       4. if (dead)
          1. end game
    3. clear
    note:
      circular bullet please
 -->
# TODO
 - [ ] character params design
   - [ ] enemy hp
   - [ ] player collision box
   - [ ] enemy collision box
 - [ ] stage design
# DOING
 - [ ] art
   - [ ] graphics (incl. start scene view, game over/clear)
     - [ ] design
     - [ ] implement
   - [ ] sounds (bgm, sound fx)
     - [ ] design
       - [x] explode
       - [ ] music
     - [ ] implement
       - [x] explode
       - [x] music
# DONE
- [x] player behaviour
  - [x] move
  - [x] launch a bullet
  - [x] take a damage when collided with bullets
  - [x] die when 0 life point
  - [x] collision with enemy
- [x] enemy behaviour
  - [x] move
  - [x] take a damage when collided with bullets
  - [x] die when 0 life point
  - [x] schedule behaviour
  - [x] launch a bullet
- [x] scene management
  - [x] create a game play scene
  - [x] game over fx
  - [x] game clear fx
- [x] enemy spwan manager
  - [x] schedule enemy spawn
- [x] boss behaviour
  - [x] move
  - [x] launch a bullet
  - [x] schedule behaviour
  - [x] take a damage when collided with bullets
  - [x] die when 0 life point
- [x] transitions
  - [x] game opening to gameplay
  - [x] to game clear/over
    - [x] may not be a separate scene (more of overlap of half-transparent screen)
      - got a bug not being able to restart/start the gameplay scene again.. reloaded the webpage instead
- [x] fx
  - [x] player explosion
  - [x] enemy explosion
- [ ] art
  - [x] font