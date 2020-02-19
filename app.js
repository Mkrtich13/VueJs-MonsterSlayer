new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    specialAttackUsed: false,
    healUsed: false,
    turns: []
  },
  computed: {
    
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.specialAttackUsed = false;
      this.healUsed = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = []
    },
    attack: function() {
      const damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for '+ damage
      })
      if(this.checkWin())return;
      this.monsterAttacks()
    },
    specialAttack: function() {
      if(!this.specialAttackUsed) {
        const damage = this.calculateDamage(10, 20);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster hard for '+ damage
        })
        if(this.checkWin())return;
        this.monsterAttacks()
        this.specialAttackUsed = true;
      }
      return;
    },
    heal: function() {
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      })
      this.monsterAttacks();
      this.healUsed = true;
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      const damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for '+ damage
      })
    },
    calculateDamage: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max-min+1)) + min;
    },
    checkWin: function() {
      if(this.playerHealth <= 0) {
        this.playerHealth = 0;
        confirm('You lost, another chance ?') 
          ? this.startGame() 
          : this.gameIsRunning = false;
        return true;
      } else if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        confirm('You win, play again ?')
          ? this.startGame()
          : this.gameIsRunning = false;
        return true;
      }

      return false;
    }
  }
})
