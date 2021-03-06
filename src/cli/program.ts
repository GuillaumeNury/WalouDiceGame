import { Game, Player, ScoreStep } from '@core/models';
import { GameService } from '@core/services';
import program from 'commander';
import * as inquirer from 'inquirer';
import { Reporter } from './reporter.class';

program
  .version('1.0.0')
  .command('play')
  .option('--example', 'Add example players.')
  .description('Demarrer une nouvelle partie')
  .action(({ example }) => main(!!example));

program.parse(process.argv);

async function main(exampleMode: boolean) {
  const players = exampleMode
    ? [new Player('Marie'), new Player('Guillaume'), new Player('David')]
    : await _getPlayers();

  const game = new Game();
  game.addPlayers(...players);
  game.setNextPlayer();

  const gameService = new GameService(new Reporter());

  while (true) {
    const points = await _getCurrentPlayerPoints(game);
    gameService.scorePoints(game, +points);

    _printGameStatus(game);
    game.setNextPlayer();
  }
}

function _printGameStatus(game: Game): void {
  console.log();
  const headers = game.players.map(p => p.name).join('\t\t\t');
  const linesCount = game.players.reduce(
    (max, player) => Math.max(player.scoreSteps.length, max),
    0,
  );

  const lines = Array.from(Array(linesCount), (_val, lineIndex) =>
    game.players
      .map(p => _getScoreStepString(p.scoreSteps[lineIndex]))
      .join('\t\t\t'),
  ).join('\n');

  console.log(headers + '\n' + lines);
  console.log();
}

function _getScoreStepString(step: ScoreStep): string {
  if (!step) {
    return '';
  }

  return step.hasStar ? `${step.points} *` : `${step.points}`;
}

async function _getPlayers(): Promise<Player[]> {
  const { playerNumberStr } = await inquirer.prompt<{
    playerNumberStr: string;
  }>({ name: 'playerNumberStr', message: 'Nombre de joueurs :' });
  const playerNumber = +playerNumberStr;
  const playerNameQuestions: inquirer.Question[] = Array.from(
    Array(playerNumber),
    (_val, index) => ({
      name: `${index}`,
      message: `Nom du joueur ${index + 1} :`,
    }),
  );

  const playerDict = await inquirer.prompt<{ [key: string]: string }>(
    playerNameQuestions,
  );
  return Object.keys(playerDict).map(k => new Player(playerDict[k]));
}

async function _getCurrentPlayerPoints(game: Game): Promise<number> {
  const player = game.currentPlayer as Player;
  const { points } = await inquirer.prompt<{
    points: string;
  }>({ name: 'points', message: `Nombre de points pour ${player.name} :` });

  return +points;
}
