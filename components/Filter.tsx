import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function valuetext(value: number) {
    return `${value} KM`;
  }


function startFilter<trailProps>(trailArray : trailData[], lengthVal? : number [], difficultyVal? : string, locationVal? : string) {
    // console.log(trailArray);
    // console.log(difficultyVal);
    // console.log(lengthVal);

    let lookup = {
        length: lengthVal,
        difficulty: difficultyVal,
        name: locationVal,

    }

    const retTrails = trailArray.filter(isRequested);

    


  
    function isRequested (trail : trailData) {

            
                // for (let key in lookup) {
                //     console.log(key)
                //     if (lookup.length){

                //         (lookup.length)

                //     }
                // }
                
     
                return ( 

                    (!locationVal ||  trail.name.toLowerCase().includes(locationVal.toLowerCase())) &&
                    (!lengthVal || parseInt(trail.length) >= lengthVal[0] && parseInt(trail.length) <= lengthVal[1]) &&
                    (!difficultyVal || parseInt(difficultyVal) === trail.difficulty)



                    
                    // locationVal? (trail.name === locationVal):trail &&
                    // lengthVal?(parseInt(trail.length) >= lengthVal[0] && parseInt(trail.length) <= lengthVal[1]):
                    // trail
                    
                
                )

    }
        
    console.log(retTrails);


}

interface trailData {

    id: number,
    name: string,
    prefecture: string;
    latitude: string;
    longitude: string;
    length: string;
    difficulty: number;
    photo_url: string;
    map_url: string;

}

export interface trailProps {
     
     trails: trailData[]
   
}

export const Filter : React.FC<trailProps> = ({trails}:trailProps) => {
    
    const [lengthVal, setLength] = React.useState<number[]>([1, 20]);
    const [difficultyVal, setDifficulty] = React.useState<string>("");
    const [locationVal, setLocation] = React.useState<string>("");
    
    const handleLenChange = (event: Event, newValue: number | number[]) => {
        setLength(newValue as number[]);
      };
    const handleDiffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficulty(event.target.value as string);
    };
    const handleLocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value as string);
    };
    


    return (

        <>

        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Difficulty</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Easy"
                name="radio-buttons-group"
                onChange={handleDiffChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Easy" />
                <FormControlLabel value="2" control={<Radio />} label="Moderate" />
                <FormControlLabel value="3" control={<Radio />} label="Hard" />
            </RadioGroup>
        </FormControl>


        <Typography id="length-slider" gutterBottom>
            Length
        </Typography>
        <Box width={300} id = "length-slider">
            <Slider 
                getAriaLabel={() => 'Length'}
                defaultValue={30} 
                value={lengthVal}
                onChange={handleLenChange}
                aria-label="Default" 
                valueLabelDisplay="auto" 
                getAriaValueText={valuetext}
                min={0.0} 
                max={50.0}
            />
        </Box>


        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
         ></Box>
         <TextField
            helperText="Select a Trail"
            id="demo-helper-text-aligned"
            label="Trail"
            onChange={handleLocChange}
        />

        <Button variant="contained" onClick={() => startFilter(trails, lengthVal, difficultyVal, locationVal )}>Filter</Button>

        <div>
            Enter
        </div></>
    );
}