import { useState } from "react";
import FlexBetween from "./FlexBetween";
import { InputBase, IconButton, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const { palette } = useTheme();
  const theme = useTheme();
  const navigate = useNavigate();
  const neutralLight = theme.palette.neutral.light;


//   const fetchData = (value) => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter((user) => {
//           return (
//             value &&
//             user &&
//             user.name &&
//             user.name.toLowerCase().includes(value)
//           );
//         });
//         setResults(results);
//       });
//   };
const searchQuery = (value) => {
    setInput("");
    navigate(`/search/${value}`);
}

  const handleChange = (value) => {
    setInput(value);
    console.log(value)
    // fetchData(value);
    // const keyDownHandler = event => {
    //     console.log('User pressed: ', event.key);
  
    //     if (event.key === 'Enter') {
    //       event.preventDefault();
  
    //       // 👇️ your logic here
    //       searchQuery(input);
    //     }
    //   };
  
    //   document.addEventListener('keydown', keyDownHandler);
  
    //   return () => {
    //     document.removeEventListener('keydown', keyDownHandler);
    //   };
  };

  return (<>
    <FlexBetween 
        backgroundColor={neutralLight} 
        borderRadius="9px" 
        gap="3rem" 
        padding="0.1rem 1.5rem"
    >
        <InputBase 
            placeholder="Search..." 
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
        <IconButton key={input} onClick={() => searchQuery(input)} >
            <Search />
        </IconButton>
    </FlexBetween>
    </>);
};