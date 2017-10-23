import tpl from './layer.html';

const layer = () => { 
    console.log("this is layer");
    return {
        name: 'layer',
        tpl:tpl
     }
}
export default layer;