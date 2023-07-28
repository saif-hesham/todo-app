type FooterProps = {
  items: number;
  finishedPercentage: number;
  finished: number;
};
const Footer = ({ items, finishedPercentage, finished }: FooterProps) => {
  if (!items) {
    return <footer className='stats'>Start adding TO DO items 🌌</footer>;
  }
  return (
    <footer className='stats'>
      {finishedPercentage === 100
        ? 'You are a champ 🏆 you finished all your TO DOS'
        : `You have ${items} items on your to do list and you finished ${finished} of
      them which is ${finishedPercentage}% keep going 💪🏽🥅`}
    </footer>
  );
};

export default Footer;
