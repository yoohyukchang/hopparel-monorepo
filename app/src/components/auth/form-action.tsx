type FormActionProp = {
    handleSubmit: (event: React.FormEvent) => void;
    type?: any;
    action?: 'submit' | 'reset' | 'button';
    text?: string;
}

const FormAction = ({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}: FormActionProp) => {
    return(
        <>
        {
            type === 'Button' ?
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customBlue hover:bg-customBlue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customBlue mt-10"
                onClick={handleSubmit}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}

export default FormAction;