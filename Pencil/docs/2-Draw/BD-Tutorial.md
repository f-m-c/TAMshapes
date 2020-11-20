**Task**
Re-draw the following diagram using Pencil and the TAM Block diagram shape collection.

![Target Block Diagram](figures/BD-Tutorial-Target.svg)

We start with a new blank document, the TAM Block Diagram collection is visible on the left.
![.](figures/BD-Tutorial-01-Stencil.png)

From there, we can drag a Human Agent and drop it on the drawing.
![.](figures/BD-Tutorial-02-DragShape.png)

Do the same for a normal Agent shape and put it below the Human Agent.
![.](figures/BD-Tutorial-03-DragAgentShape.png)

Resize it with the shape handles.
![.](figures/BD-Tutorial-04-ResizeAgent.png)

Add Text "Browser" using the Text property field on the right.
![.](figures/BD-Tutorial-05-EnterText.png)

Align the text at the top using the alignment property button
![.](figures/BD-Tutorial-06-AlignText.png)

Then set the background color (Fill color) to light gray.
![.](figures/BD-Tutorial-07-FillColorSelection.png)
![.](figures/BD-Tutorial-08-ColorPickerGrey.png)

Now we need two agents inside the Browser. The left one is the Fiori Launchpad,
![.](figures/BD-Tutorial-09-AddNestedAgents.png)

The right one are UI5 Applications. We need it stacked, so from context menu select "Multiple".
![.](figures/BD-Tutorial-10-Multiple.png)

To enter text, you can also double click the shape and enter text in place. Type "UI5 Applications".

When you enter text in place after a double click, the text is always displayed aligned at the top, regardless of the actual alignment in the shape.
![.](figures/BD-Tutorial-11-EnterTextInPlace.png)

Now we need a simple channel between human agent and Browser, but the  standard channel has already a Request-Response annotation.
![.](figures/BD-Tutorial-12-Stencil-Channel.png)
![.](figures/BD-Tutorial-13-ChannelConnect.png)

To get rid of this, choose "Request Direction - None" in the properties.
![.](figures/BD-Tutorial-14-ChannelNoRequest.png)

Zoom (CTRL+Mousewheel) in to position the channel circle more precisely.
![.](figures/BD-Tutorial-15-ChannelPositioning.png)
![.](figures/BD-Tutorial-16-ChannelPosControl.png)

The next shape is the Service Proxy agent.
![.](figures/BD-Tutorial-17-AgentSProxy.png)

Add a channel to connect Browser to Service Proxy
![.](figures/BD-Tutorial-18-Channel2SProxy.png)

Don't forget to glue the lines to the connection points of the agents. They are highlighted in red when glueing.
![.](figures/BD-Tutorial-19-ChannelConnectBottom.png)
![.](figures/BD-Tutorial-20-ChannelConnectTop.png)

Now we need a storage for the Service Configuration at the left side of Service Proxy.
![.](figures/BD-Tutorial-21-Stencil-Storage.png)
![.](figures/BD-Tutorial-22-StorageSConfig.png)

Now we need a read-only access arrow (from storage to agent), but the "hor. Read Access" shape points in the opposite direction.
![.](figures/BD-Tutorial-23-StencilAccess.png)
![.](figures/BD-Tutorial-24-ReadAccessPos.png)

Connect one side first, then turn the arrow by connecting it with the other side.
![.](figures/BD-Tutorial-25-ReadAccessConnectLeft.png)
![.](figures/BD-Tutorial-26-ReadAccessConnectRight.png)

The next shape is the business logic agent below the Service Proxy. It should be wide and rather flat.
![.](figures/BD-Tutorial-27-AgentBLogic.png)

The Business Data Storage shape should have similar dimensions.
![.](figures/BD-Tutorial-28-StorageBData.png)

We need a vertical modifying Access (two curved arrows) between Business Logic and Business Data.
![.](figures/BD-Tutorial-29-StencilModAccess.png)
![.](figures/BD-Tutorial-30-StencilModAccess2BData.png)

For multiple Backend Servers combining Business Logic and Business Data, we need a stacked agent shape again. Let's start with a normal agent.
![.](figures/BD-Tutorial-31-AgentGrouping1.png)

Resize it to cover both agent and storage.
![.](figures/BD-Tutorial-32-AgentGrouping2.png)

Set the fill color to light gray.
![.](figures/BD-Tutorial-33-FillColor.png)

To see the inner agent and storage, we need to send the new shape to the back. From the context menu, select "Arrangement -> Send to Back".
![.](figures/BD-Tutorial-34-SendToBack.png)

For the stacked shape, select "Multiple" from the context menu as well.
![.](figures/BD-Tutorial-35-MultipleMenu.png)
![.](figures/BD-Tutorial-36-Multiple.png)

The "Backend Server" Label is still missing and needs some space; it should be aligned at the bottom.
![.](figures/BD-Tutorial-37-TextAlign.png)
![.](figures/BD-Tutorial-38-AlignedText.png)

Another request-response channel connects the Backend Server with the Service Proxy.

(OK, in the target block diagram, the channel goes through to the Business Logic agent. Luckily, in this case, it has the same result.)
![.](figures/BD-Tutorial-39-AddChannel.png)

To align the channel to the Service Proxy, change "Alignment" from "Center" to "Start".
![.](figures/BD-Tutorial-40-ChannelPosition.png)
![.](figures/BD-Tutorial-41-ChannelAlignStart.png)
![.](figures/BD-Tutorial-42-ChannelAligned.png)

Let's move on with the Identity Provider on the right side.
![.](figures/BD-Tutorial-43-AgentIdP.png)

It has read only access to a User storage.
![.](figures/BD-Tutorial-44-StorageUser.png)

The channel with one corner / elbow is tricky - it is not available as individual shape. But you can change a vertical channel to what we need:
![.](figures/BD-Tutorial-45-StencilChannelV.png)
![.](figures/BD-Tutorial-46-ChannelIdP.png)

Via the context menu of the channel, select "Extension at Start", which adds the elbow.
![.](figures/BD-Tutorial-47-MenuExtensionStart.png)
![.](figures/BD-Tutorial-48-ElbowStart.png)

To enter a text with line breaks, you have to use the Text box in the Properties. Here, you can add or remove line breaks in the text.
![.](figures/BD-Tutorial-49-ChannelText.png)

A yellow control point lets you re-position the text.
![.](figures/BD-Tutorial-50-ChannelTextPos.png)
![.](figures/BD-Tutorial-51-ChannelTextResult.png)

Now we need a very small agent "Log Writer". Resize vertically, then enter the text. Now you know how far you can resize horizontally.
![.](figures/BD-Tutorial-52-AgentLogWriter.png)

For the Logs storage, it's similar. We need to align on the right as well.
![.](figures/BD-Tutorial-53-StorageLogs.png)

We need a write-only access arrow this time, so again we need to turn an existing one.
![.](figures/BD-Tutorial-54-WriteAccess.png)
![.](figures/BD-Tutorial-55-WriteToLogs.png)

Finally, a unidirectional channel is required leading from Service Proxy to Log Writer. We start with a standard horizontal channel, set "Request Direction to "None",
![.](figures/BD-Tutorial-56-ChannelNoReqRes.png)

and this time, set "Arrow Style End: Full". This means that at the end of the line(s), a full arrow will be drawn.
![.](figures/BD-Tutorial-57-ChannelAddArrowheads.png)

Add the text "Access Log" and place it accordingly.
![.](figures/BD-Tutorial-58-ChannelAddText.png)

That's it.
![.](figures/BD-Tutorial-59-Result.png)

