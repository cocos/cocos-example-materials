import { Color, Canvas, UITransform, instantiate, math, Toggle, TextureCube, _decorator, Component, Button, labelAssembler, game, director, Node, Scene, renderer, CameraComponent, Label, ForwardPipeline, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('internal.DisplayControl')
export class DisplayControl extends Component {
    @property(Node)
    BeforeModeButton: Node | null = null;
    @property(Node)
    NextModeButton: Node | null = null;
    @property(Node)
    DisplayNode: Node | null = null;

	private _single: number = 0;
    private _activeNode: Node | null = null;

    start() {
        const skinNodes = this.node.children;
        this._activeNode = skinNodes[0];
        const richTextComponent = this.DisplayNode.getComponent(RichText);
        richTextComponent.string = this._activeNode.name;
        for(let i = 1; i < skinNodes.length; i++) {
            skinNodes[i].active = false;
        }

        this.BeforeModeButton.on(Button.EventType.CLICK, this.beforeModeButton, this);
        this.NextModeButton.on(Button.EventType.CLICK, this.nextModeButton, this);
    }

    nextModeButton(button: Button) {
        if(this._activeNode) {
            this._activeNode.active = false;
            this._activeNode = null;
        }

        const idx = (this._single + 1) % 4;
        const skinNodes = this.node.children;
        const skinNode = skinNodes[idx];
        skinNode.active = true;
        this._activeNode = skinNode;

        const richTextComponent = this.DisplayNode.getComponent(RichText);
        richTextComponent.string = this._activeNode.name;

        this._single = idx;
    }

    beforeModeButton(button: Button) {
        if(this._activeNode) {
            this._activeNode.active = false;
            this._activeNode = null;
        }

        const idx = this._single === 0 ? 3: this._single - 1;
        const skinNodes = this.node.children;
        const skinNode = skinNodes[idx];
        skinNode.active = true;
        this._activeNode = skinNode;

        const richTextComponent = this.DisplayNode.getComponent(RichText);
        richTextComponent.string = this._activeNode.name;

        this._single = idx;
    }
}