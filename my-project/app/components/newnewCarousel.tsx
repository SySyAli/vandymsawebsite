"use client"
import { Component } from 'react';
import ImageGallery from 'react-image-gallery'

type MyProps = {
	// using `interface` is also ok
	links: [];
};

export default function MyGallery({links}: any){
    return (
        <div className="h-fit">
            <ImageGallery items={links} />
        </div>
    );
}

/*
export default class MyGallery extends Component<MyProps> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const params: any = this.props;
		return (
			<div className="h-fit">
				<ImageGallery items={params.links} />
			</div>
		);
	}
}
*/
