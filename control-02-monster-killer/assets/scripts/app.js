const attackValue = 10;
const monsterAttackValue = 14;
const strongAttackValue = 17;
const healValue = 20;
const normalAttackMode = "ATTACK";
const strongAttackMode = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];
let enteredvalue = prompt("enter Max Health");

if (isNaN(enteredvalue) || enteredvalue <= 0 || enteredvalue >= 100) {
  enteredvalue = 100;
}

let choosenMaxLife = +enteredvalue;
let hasBonusLife = true;
let currentMonsterHealth = choosenMaxLife;
let currentPlayerHealth = choosenMaxLife;

adjustHealthBars(choosenMaxLife);

function reset() {
  currentMonsterHealth = choosenMaxLife;
  currentPlayerHealth = choosenMaxLife;
  resetGame(choosenMaxLife);
}

function attackMonster(mode) {
  const maxDamage = mode === normalAttackMode ? attackValue : strongAttackValue;
  const logEvent =
    mode === normalAttackMode
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  //   if (mode === normalAttackMode) {
  //     maxDamage = attackValue;
  //     logEvent = LOG_EVENT_PLAYER_ATTACK;
  //   } else if (mode === strongAttackMode) {
  //     maxDamage = strongAttackValue;
  //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  //   }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}
function endRound() {
  let initialPalyerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(monsterAttackValue);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPalyerHealth;
    setPlayerHealth(initialPalyerHealth);
    alert("YOU USED YOUR BONUS LIFE");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("PLAYER WON !!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON !!!",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("MONSTER WON !!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON !!!",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("YOU HAVE A DRAW");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
  if (
    (currentMonsterHealth <= 0 && currentPlayerHealth > 0) ||
    (currentPlayerHealth <= 0 && currentMonsterHealth > 0) ||
    (currentMonsterHealth <= 0 && currentPlayerHealth <= 0)
  ) {
    reset();
  }
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if ((ev = LOG_EVENT_PLAYER_ATTACK)) {
    logEntry.target = "MONSTER";
  } else if ((ev = LOG_EVENT_PLAYER_STRONG_ATTACK)) {
    logEntry.target = "MONSTER";
  } else if ((ev = LOG_EVENT_MONSTER_ATTACK)) {
    logEntry.target = "PLAYER";
  } else if ((ev = LOG_EVENT_PLAYER_HEAL)) {
    logEntry.target = "PLAYER";
  } else if ((ev = LOG_EVENT_GAME_OVER)) {
    logEntry;
  }
  battleLog.push(logEntry);
}

function printLogHandler() {
  console.log(battleLog);
}

function attackHandler() {
  attackMonster(normalAttackMode);
}

function strongAttackHandler() {
  attackMonster(strongAttackMode);
}

function healPlayerHandler() {
  let heal;
  if (currentPlayerHealth >= choosenMaxLife - healValue) {
    alert("YOU CANT HEAL TO MORE THEN MAX INITIAL HEALTH");
    heal = choosenMaxLife - currentPlayerHealth;
  } else {
    heal = healValue;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += heal;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    heal,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);