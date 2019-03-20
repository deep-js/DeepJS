import { InputContainerPresenter } from "./input-container.presenter";

export interface InputContainerComponent{
	/**
	 * Return the current input presenter
	 */
	getPresenter():InputContainerPresenter;
}
