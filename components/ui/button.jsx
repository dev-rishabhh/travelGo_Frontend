import "./button.css";

export  function Button( {className = "", variant = "default", size = "default", ...props}) {
   const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  return (
   <button className={classes}{...props}></button>
  )
}


