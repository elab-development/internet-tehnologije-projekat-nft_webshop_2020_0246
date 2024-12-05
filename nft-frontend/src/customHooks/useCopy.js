import { useState } from 'react';

function useCopy() {
  const [copied, setCopied] = useState(false);

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Resetovanje stanja "copied" nakon 2 sekunde
    }).catch((err) => {
      console.error('Neuspesno kopiranje teksta: ', err);
    });
  };
   

  return [copied, copyText];
}

export default useCopy;