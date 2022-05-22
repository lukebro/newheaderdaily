import { forwardRef } from 'react';

function Anchor(
    props: React.LinkHTMLAttributes<HTMLAnchorElement>,
    ref: React.ForwardedRef<HTMLAnchorElement>,
): JSX.Element {
    return (
        <a
            ref={ref}
            className="text-indigo-600 underline cursor-pointer"
            {...props}
        />
    );
}

export default forwardRef(Anchor);
