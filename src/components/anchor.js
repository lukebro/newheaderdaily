import { forwardRef } from 'react';

function Anchor(props, ref) {
    return <a ref={ref} className="text-indigo-600 underline cursor-pointer" {...props} />
}

export default forwardRef(Anchor);

