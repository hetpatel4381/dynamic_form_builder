import RenderForm from "./RenderForm";
const RenderFormFields = ({form , index}) => {
     return form.fields.map((field) => <RenderForm field={field} index = {index} key={index}/>);
}

export default RenderFormFields
