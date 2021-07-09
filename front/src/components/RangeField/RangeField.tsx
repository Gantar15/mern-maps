import { Star } from "@material-ui/icons";
import { FC, useState } from "react";

import './RangeField.css';

interface IPropTypes{
    min: number;
    max: number;
    name: string;
}
const RangeField: FC<IPropTypes> = (props) => {
    const {min = 0, max = 5} = props;
    const [indicatorValue, setIndicatorValue] = useState<number>(min);

    function changeHandler(ev: any){
        setIndicatorValue(+ev.target.value);
    }
    
    return (
        <div className="range-field">
            <input name={props.name} onChange={changeHandler} type="range" value={indicatorValue} min={min} max={max} />
            <div className="indicator">
                {Array(indicatorValue).fill(null).map(
                    (el, indx: number) => <Star className="star" key={indx} style={{color: 'gold'}} />)}
                {Array(5 - indicatorValue).fill(null).map(
                    (el, indx: number) => <Star className="star" key={indx} style={{color: '#9A9A9A'}} />)}
            </div>
        </div>
    );
}
export default RangeField;