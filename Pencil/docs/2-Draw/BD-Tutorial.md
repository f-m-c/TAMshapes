**Task**
Re-draw the following diagram using Pencil and the TAM Block diagram shape collection.


![Target Block Diagram](figures/BD-Tutorial-Target.svg)

<span class="caption">Target diagram to draw in this tutorial</span>


![Stencil](figures/BD-Tutorial-01-Stencil.png)

<span class="caption">We start with a new blank document, the TAM Block Diagram collection is visible on the left.</span>


![Drag Human Agent Shape](figures/BD-Tutorial-02-DragShape.png)

<span class="caption">From there, we can drag a Human Agent and drop it on the drawing.</span>



![Drag Agent Shape](figures/BD-Tutorial-03-DragAgentShape.png)

<span class="caption">Do the same for a normal Agent shape and put it below the Human Agent.</span>



![Resize Agent](figures/BD-Tutorial-04-ResizeAgent.png)

<span class="caption">Resize it with the shape handles.</span>




![Add Text to Agent](figures/BD-Tutorial-05-EnterText.png)

<span class="caption">Add Text "Browser" using the Text property field on the right.</span>



![Align Text](figures/BD-Tutorial-06-AlignText.png)

<span class="caption">Align the text at the top using the alignment property button</span>



![Set Background Color](figures/BD-Tutorial-07-FillColorSelection.png)
![Color Picker](figures/BD-Tutorial-08-ColorPickerGrey.png)

<span class="caption">Then set the background color (Fill color) to light gray.</span>



![Add nested Agents](figures/BD-Tutorial-09-AddNestedAgents.png)

<span class="caption">Now we need two agents inside the Browser. The left one is the Fiori Launchpad,</span>



![Set to Multiple](figures/BD-Tutorial-10-Multiple.png)

<span class="caption">The right one are UI5 Applications. We need it stacked, so from context menu select "Multiple".</span>



To enter text, you can also double click the shape and enter text in place. Type "UI5 Applications".

![Double Click to enter Text in place](figures/BD-Tutorial-11-EnterTextInPlace.png)

<span class="caption">When you enter text in place after a double click, the text is always displayed aligned at the top, regardless of the actual alignment in the shape.</span>



![Stencil Channel Shape](figures/BD-Tutorial-12-Stencil-Channel.png)
![Connect Channel](figures/BD-Tutorial-13-ChannelConnect.png)

<span class="caption">Now we need a simple channel between human agent and Browser, but the  standard channel has already a Request-Response annotation.</span>



![No request direction](figures/BD-Tutorial-14-ChannelNoRequest.png)

<span class="caption">To get rid of this, choose "Request Direction - None" in the properties.</span>



![Position Channel](figures/BD-Tutorial-15-ChannelPositioning.png)
![Position Channel with Control](figures/BD-Tutorial-16-ChannelPosControl.png)

<span class="caption">Zoom (CTRL+Mousewheel) in to position the channel circle more precisely.</span>



![Draw Agent Service Proxy](figures/BD-Tutorial-17-AgentSProxy.png)
<span class="caption">The next shape is the Service Proxy agent.</span>



![Add channel to service proxy](figures/BD-Tutorial-18-Channel2SProxy.png)

<span class="caption">Add a channel to connect Browser to Service Proxy</span>




![Connect Channel Bottom](figures/BD-Tutorial-19-ChannelConnectBottom.png)
![Connect Channel Top](figures/BD-Tutorial-20-ChannelConnectTop.png)

<span class="caption">Don't forget to glue the lines to the connection points of the agents. They are highlighted in red when glueing.</span>




![Stencil Storage Shape](figures/BD-Tutorial-21-Stencil-Storage.png)
![Storage Service Configuration](figures/BD-Tutorial-22-StorageSConfig.png)

<span class="caption">Now we need a storage for the Service Configuration at the left side of Service Proxy.</span>



![Stencil read access shape](figures/BD-Tutorial-23-StencilAccess.png)
![Read Access Position](figures/BD-Tutorial-24-ReadAccessPos.png)

<span class="caption">Now we need a read-only access arrow (from storage to agent), but the "hor. Read Access" shape points in the opposite direction.</span>



![Read Access connect left](figures/BD-Tutorial-25-ReadAccessConnectLeft.png)
![Read Access connect right](figures/BD-Tutorial-26-ReadAccessConnectRight.png)

<span class="caption">Connect one side first, then turn the arrow by connecting it with the other side.</span>



![Agent Business Logic](figures/BD-Tutorial-27-AgentBLogic.png)

<span class="caption">The next shape is the business logic agent below the Service Proxy. It should be wide and rather flat.</span>




![Storage Business Data](figures/BD-Tutorial-28-StorageBData.png)

<span class="caption">The Business Data Storage shape should have similar dimensions.</span>




![Stencil mod. Access Shape](figures/BD-Tutorial-29-StencilModAccess.png)
![Mod. Access connect](figures/BD-Tutorial-30-StencilModAccess2BData.png)

<span class="caption">We need a vertical modifying Access (two curved arrows) between Business Logic and Business Data.</span>




![Agent for Grouping](figures/BD-Tutorial-31-AgentGrouping1.png)

<span class="caption">For multiple Backend Servers combining Business Logic and Business Data, we need a stacked agent shape again. Let's start with a normal agent.</span>



![Agent Resize](figures/BD-Tutorial-32-AgentGrouping2.png)
<span class="caption">Resize it to cover both agent and storage.</span>




![Agent Fill Color](figures/BD-Tutorial-33-FillColor.png)

<span class="caption">Set the fill color to light gray.</span>




![Send to Back](figures/BD-Tutorial-34-SendToBack.png)

<span class="caption">To see the inner agent and storage, we need to send the new shape to the back. From the context menu, select "Arrangement -> Send to Back".</span>




![Shape Menu Multiple](figures/BD-Tutorial-35-MultipleMenu.png)
![Agent Multiple](figures/BD-Tutorial-36-Multiple.png)

<span class="caption">For the stacked shape, select "Multiple" from the context menu as well.</span>




![Align Text](figures/BD-Tutorial-37-TextAlign.png)
![Agent with aligned text](figures/BD-Tutorial-38-AlignedText.png)

<span class="caption">The "Backend Server" Label is still missing and needs some space; it should be aligned at the bottom.</span>

![Add channel](figures/BD-Tutorial-39-AddChannel.png)

<span class="caption">Another request-response channel connects the Backend Server with the Service Proxy.</span>

(OK, in the target block diagram, the channel goes through to the Business Logic agent. Luckily, in this case, it has the same result.)


![Set Channel position](figures/BD-Tutorial-40-ChannelPosition.png)
![Align at Start](figures/BD-Tutorial-41-ChannelAlignStart.png)
![Aligned Channel](figures/BD-Tutorial-42-ChannelAligned.png)

<span class="caption">To align the channel to the Service Proxy, change "Alignment" from "Center" to "Start".</span>




![Agent IdP](figures/BD-Tutorial-43-AgentIdP.png)

<span class="caption">Let's move on with the Identity Provider on the right side.</span>




![Storage User](figures/BD-Tutorial-44-StorageUser.png)

<span class="caption">It has read only access to a User storage.</span>




![Add vertical Channel](figures/BD-Tutorial-45-StencilChannelV.png)
![Channel to IdP](figures/BD-Tutorial-46-ChannelIdP.png)

<span class="caption">The channel with one corner / elbow is tricky - it is not available as individual shape. But you can change a vertical channel to what we need:</span>




![Channel Menu Extension at Start](figures/BD-Tutorial-47-MenuExtensionStart.png)
![Channel with one elbow](figures/BD-Tutorial-48-ElbowStart.png)

<span class="caption">Via the context menu of the channel, select "Extension at Start", which adds the elbow.</span>




![Channel Text](figures/BD-Tutorial-49-ChannelText.png)

<span class="caption">To enter a text with line breaks, you have to use the Text box in the Properties. Here, you can add or remove line breaks in the text.</span>




![Text Position Control](figures/BD-Tutorial-50-ChannelTextPos.png)
![Channel Text](figures/BD-Tutorial-51-ChannelTextResult.png)

<span class="caption">A yellow control point lets you re-position the text.</span>




![Agent Log Writer](figures/BD-Tutorial-52-AgentLogWriter.png)

<span class="caption">Now we need a very small agent "Log Writer". Resize vertically, then enter the text. Now you know how far you can resize horizontally.</span>




![Storage Logs](figures/BD-Tutorial-53-StorageLogs.png)

<span class="caption">For the Logs storage, it's similar. We need to align on the right as well.</span>




![Add Write Access](figures/BD-Tutorial-54-WriteAccess.png)
![Write Access to Logs](figures/BD-Tutorial-55-WriteToLogs.png)

<span class="caption">We need a write-only access arrow this time, so again we need to turn an existing one.</span>




![Channel set Request Direction None](figures/BD-Tutorial-56-ChannelNoReqRes.png)

<span class="caption">Finally, a unidirectional channel is required leading from Service Proxy to Log Writer. We start with a standard horizontal channel, set "Request Direction to "None",</span>




![Channel add arrowheads](figures/BD-Tutorial-57-ChannelAddArrowheads.png)

<span class="caption">and this time, set "Arrow Style End: Full". This means that at the end of the line(s), a full arrow will be drawn.</span>




![Channel Text](figures/BD-Tutorial-58-ChannelAddText.png)

<span class="caption">Add the text "Access Log" and place it accordingly.</span>



![Result](figures/BD-Tutorial-59-Result.png)
<span class="caption">That's it.</span>
