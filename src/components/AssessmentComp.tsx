import { FaCheckCircle, FaArrowCircleRight } from "react-icons/fa";
import { NavLink } from "react-router";

type AssessmentCompProps = {
  heading: string;
  para: string;
  list: string[];
  link: string;
}
const AssessmentComp = ({ heading, para, list, link }: AssessmentCompProps) => {
  return (
    <div className="flex flex-col justify-between w-96 h-125 p-10 rounded-4xl bg-white shadow-2xl shadow-zinc-400">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold">{heading}</p>
        <p>{para}</p>
        <ul>
          {
            list.map((item, index) => (
              <li
                className="flex items-center gap-2"
                key={index}>
                <FaCheckCircle className="text-emerald-500" />
                {item}
              </li>
            ))
          }
        </ul>
      </div>
      <NavLink
        className='flex justify-between items-center gap-2 rounded-full bg-black text-white px-2 py-2'
        to={link}
      >
        <p className='ps-2'>Check age of your organs</p><FaArrowCircleRight className='text-4xl' />
      </NavLink>
    </div>
  )
}

export default AssessmentComp
