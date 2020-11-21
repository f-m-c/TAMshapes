**Task**
Re-draw the following diagram using Pencil and the TAM Block diagram shape collection.


![Target Block Diagram](figures/BD-Tutorial-Target.svg)

<span class="caption">Target diagram to draw in this tutorial</span>


![Stencil](figures/BD-Tutorial-01-Stencil.png)

<span class="caption">We start with a new blank document, the TAM Block Diagram collection is visible on the left.</span>


![Drag Human Agent Shape](figures/BD-Tutorial-02-DragShape.png)

<figcaption>From there, we can drag a Human Agent and drop it on the drawing.</figcaption>



![Drag Agent Shape](figures/BD-Tutorial-03-DragAgentShape.png)

<figcaption>Do the same for a normal Agent shape and put it below the Human Agent.</figcaption>



![Resize Agent](figures/BD-Tutorial-04-ResizeAgent.png)

<figcaption>Resize it with the shape handles.</figcaption>




![Add Text to Agent](figures/BD-Tutorial-05-EnterText.png)

<figcaption>Add Text "Browser" using the Text property field on the right.</figcaption>



![Align Text](figures/BD-Tutorial-06-AlignText.png)

<figcaption>Align the text at the top using the alignment property button</figcaption>



![Set Background Color](figures/BD-Tutorial-07-FillColorSelection.png)
![Color Picker](figures/BD-Tutorial-08-ColorPickerGrey.png)

<figcaption>Then set the background color (Fill color) to light gray.</figcaption>



![Add nested Agents](figures/BD-Tutorial-09-AddNestedAgents.png)

<figcaption>Now we need two agents inside the Browser. The left one is the Fiori Launchpad,</figcaption>



![Set to Multiple](figures/BD-Tutorial-10-Multiple.png)

<figcaption>The right one are UI5 Applications. We need it stacked, so from context menu select "Multiple".</figcaption>



To enter text, you can also double click the shape and enter text in place. Type "UI5 Applications".

![Double Click to enter Text in place](figures/BD-Tutorial-11-EnterTextInPlace.png)

<figcaption>When you enter text in place after a double click, the text is always displayed aligned at the top, regardless of the actual alignment in the shape.</figcaption>



![Stencil Channel Shape](figures/BD-Tutorial-12-Stencil-Channel.png)
![Connect Channel](figures/BD-Tutorial-13-ChannelConnect.png)

<figcaption>Now we need a simple channel between human agent and Browser, but the  standard channel has already a Request-Response annotation.</figcaption>



![No request direction](figures/BD-Tutorial-14-ChannelNoRequest.png)

<figcaption>To get rid of this, choose "Request Direction - None" in the properties.</figcaption>



![Position Channel](figures/BD-Tutorial-15-ChannelPositioning.png)
![Position Channel with Control](figures/BD-Tutorial-16-ChannelPosControl.png)

<figcaption>Zoom (CTRL+Mousewheel) in to position the channel circle more precisely.</figcaption>



![Draw Agent Service Proxy](figures/BD-Tutorial-17-AgentSProxy.png)
<figcaption>The next shape is the Service Proxy agent.</figcaption>



![Add channel to service proxy](figures/BD-Tutorial-18-Channel2SProxy.png)

<figcaption>Add a channel to connect Browser to Service Proxy</figcaption>




![Connect Channel Bottom](figures/BD-Tutorial-19-ChannelConnectBottom.png)
![Connect Channel Top](figures/BD-Tutorial-20-ChannelConnectTop.png)

<figcaption>Don't forget to glue the lines to the connection points of the agents. They are highlighted in red when glueing.</figcaption>




![Stencil Storage Shape](figures/BD-Tutorial-21-Stencil-Storage.png)
![Storage Service Configuration](figures/BD-Tutorial-22-StorageSConfig.png)

<figcaption>Now we need a storage for the Service Configuration at the left side of Service Proxy.</figcaption>



![Stencil read access shape](figures/BD-Tutorial-23-StencilAccess.png)
![Read Access Position](figures/BD-Tutorial-24-ReadAccessPos.png)

<figcaption>Now we need a read-only access arrow (from storage to agent), but the "hor. Read Access" shape points in the opposite direction.</figcaption>



![Read Access connect left](figures/BD-Tutorial-25-ReadAccessConnectLeft.png)
![Read Access connect right](figures/BD-Tutorial-26-ReadAccessConnectRight.png)

<figcaption>Connect one side first, then turn the arrow by connecting it with the other side.</figcaption>



![Agent Business Logic](figures/BD-Tutorial-27-AgentBLogic.png)

<figcaption>The next shape is the business logic agent below the Service Proxy. It should be wide and rather flat.</figcaption>




![Storage Business Data](figures/BD-Tutorial-28-StorageBData.png)

<figcaption>The Business Data Storage shape should have similar dimensions.</figcaption>




![Stencil mod. Access Shape](figures/BD-Tutorial-29-StencilModAccess.png)
![Mod. Access connect](figures/BD-Tutorial-30-StencilModAccess2BData.png)

<figcaption>We need a vertical modifying Access (two curved arrows) between Business Logic and Business Data.</figcaption>




![Agent for Grouping](figures/BD-Tutorial-31-AgentGrouping1.png)

<figcaption>For multiple Backend Servers combining Business Logic and Business Data, we need a stacked agent shape again. Let's start with a normal agent.</figcaption>



![Agent Resize](figures/BD-Tutorial-32-AgentGrouping2.png)
<figcaption>Resize it to cover both agent and storage.</figcaption>




![Agent Fill Color](figures/BD-Tutorial-33-FillColor.png)

<figcaption>Set the fill color to light gray.</figcaption>




![Send to Back](figures/BD-Tutorial-34-SendToBack.png)

<figcaption>To see the inner agent and storage, we need to send the new shape to the back. From the context menu, select "Arrangement -> Send to Back".</figcaption>




![Shape Menu Multiple](figures/BD-Tutorial-35-MultipleMenu.png)
![Agent Multiple](figures/BD-Tutorial-36-Multiple.png)

<figcaption>For the stacked shape, select "Multiple" from the context menu as well.</figcaption>




![Align Text](figures/BD-Tutorial-37-TextAlign.png)
![Agent with aligned text](figures/BD-Tutorial-38-AlignedText.png)

<figcaption>The "Backend Server" Label is still missing and needs some space; it should be aligned at the bottom.</figcaption>

![Add channel](figures/BD-Tutorial-39-AddChannel.png)

<figcaption>Another request-response channel connects the Backend Server with the Service Proxy.</figcaption>

(OK, in the target block diagram, the channel goes through to the Business Logic agent. Luckily, in this case, it has the same result.)


![Set Channel position](figures/BD-Tutorial-40-ChannelPosition.png)
![Align at Start](figures/BD-Tutorial-41-ChannelAlignStart.png)
![Aligned Channel](figures/BD-Tutorial-42-ChannelAligned.png)

<figcaption>To align the channel to the Service Proxy, change "Alignment" from "Center" to "Start".</figcaption>




![Agent IdP](figures/BD-Tutorial-43-AgentIdP.png)

<figcaption>Let's move on with the Identity Provider on the right side.</figcaption>




![Storage User](figures/BD-Tutorial-44-StorageUser.png)

<figcaption>It has read only access to a User storage.</figcaption>




![Add vertical Channel](figures/BD-Tutorial-45-StencilChannelV.png)
![Channel to IdP](figures/BD-Tutorial-46-ChannelIdP.png)

<figcaption>The channel with one corner / elbow is tricky - it is not available as individual shape. But you can change a vertical channel to what we need:</figcaption>




![Channel Menu Extension at Start](figures/BD-Tutorial-47-MenuExtensionStart.png)
![Channel with one elbow](figures/BD-Tutorial-48-ElbowStart.png)

<figcaption>Via the context menu of the channel, select "Extension at Start", which adds the elbow.</figcaption>




![Channel Text](figures/BD-Tutorial-49-ChannelText.png)

<figcaption>To enter a text with line breaks, you have to use the Text box in the Properties. Here, you can add or remove line breaks in the text.</figcaption>




![Text Position Control](figures/BD-Tutorial-50-ChannelTextPos.png)
![Channel Text](figures/BD-Tutorial-51-ChannelTextResult.png)

<figcaption>A yellow control point lets you re-position the text.</figcaption>




![Agent Log Writer](figures/BD-Tutorial-52-AgentLogWriter.png)

<figcaption>Now we need a very small agent "Log Writer". Resize vertically, then enter the text. Now you know how far you can resize horizontally.</figcaption>




![Storage Logs](figures/BD-Tutorial-53-StorageLogs.png)

<figcaption>For the Logs storage, it's similar. We need to align on the right as well.</figcaption>




![Add Write Access](figures/BD-Tutorial-54-WriteAccess.png)
![Write Access to Logs](figures/BD-Tutorial-55-WriteToLogs.png)

<figcaption>We need a write-only access arrow this time, so again we need to turn an existing one.</figcaption>




![Channel set Request Direction None](figures/BD-Tutorial-56-ChannelNoReqRes.png)

<figcaption>Finally, a unidirectional channel is required leading from Service Proxy to Log Writer. We start with a standard horizontal channel, set "Request Direction to "None",</figcaption>




![Channel add arrowheads](figures/BD-Tutorial-57-ChannelAddArrowheads.png)

<figcaption>and this time, set "Arrow Style End: Full". This means that at the end of the line(s), a full arrow will be drawn.</figcaption>




![Channel Text](figures/BD-Tutorial-58-ChannelAddText.png)

<figcaption>Add the text "Access Log" and place it accordingly.</figcaption>



![Result](figures/BD-Tutorial-59-Result.png)
<figcaption>That's it.</figcaption>
