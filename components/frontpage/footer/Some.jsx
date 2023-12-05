import Image from "next/image";

export default function Some(props) {
  return (
    <div>
      <Image src={props.src} height={100} width={100} alt="some icon" />
    </div>
  );
}
