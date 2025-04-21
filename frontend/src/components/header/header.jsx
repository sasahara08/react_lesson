import LoginInput from "../auth/InputField"

export default function header(){
    return (
        <>
        <div className="headermqin">

            <InputField className="inputField"
            type="text" 
            name="serchcontent"
            label="serchcontent"
            placeholder="豆の種類でレシピを検索" />

            

        </div>
        </>
    )
}