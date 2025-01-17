function Icon(props: { iconImg: string; alt: string }) {
  return (
    <a className="mx-2 block">
      <img className="rounded-lg" src={props.iconImg} alt={props.alt} />
    </a>
  );
}

export default Icon;
