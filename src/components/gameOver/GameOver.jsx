import styles from './GameOver.module.css';
 
const GameOver = ({reestart, score}) => {
  return (
    <div className={styles.gameContainer}>
      <h1>Fim de jogo</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={reestart}>Reiniciar Jogo</button>
    </div>
  )
}

export default GameOver