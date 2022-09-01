import styles from './GameOver.module.css';
 
const GameOver = ({reestart}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <button onClick={reestart}>Reiniciar Jogo</button>
    </div>
  )
}

export default GameOver