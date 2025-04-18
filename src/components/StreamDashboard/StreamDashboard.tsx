"use client";

import { useState, useEffect } from 'react';
import Player from '../Player';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateRtmpKey } from "@/services/rtmp-key-generator";
import { getStreamStatus, startStream, stopStream, StreamStatus } from "@/services/stream-control";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { generateStreamTitles } from "@/ai/flows/generate-stream-titles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from "@/components/ui/chart";
import * as Recharts from "recharts";
import { Icons } from "@/components/icons";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const initialStreamStatus: StreamStatus = {
  isLive: false,
  bitrateKbps: 0,
  fps: 0,
  latencyMs: 0,
};

const StreamDashboard = () => {
  const [rtmpKey, setRtmpKey] = useState<string>('');
  const [streamStatus, setStreamStatus] = useState<StreamStatus>(initialStreamStatus);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [streamContentDescription, setStreamContentDescription] = useState<string>('');
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isStartingStream, setIsStartingStream] = useState(false);
  const [isStoppingStream, setIsStoppingStream] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const key = await generateRtmpKey();
      setRtmpKey(key);

      const status = await getStreamStatus();
      setStreamStatus(status);

      // Initialize chart data with some default values
      const initialChartData = Array.from({ length: 30 }, (_, i) => ({
        time: i,
        bitrate: 0,
        fps: 0,
        latency: 0,
      }));
      setChartData(initialChartData);

    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    // Simulate real-time data updates for charts
    const intervalId = setInterval(async () => {
      const newStatus = await getStreamStatus();
      setStreamStatus(newStatus);

      setChartData((prevData) => {
        const newDataPoint = {
          time: prevData.length,
          bitrate: newStatus.bitrateKbps,
          fps: newStatus.fps,
          latency: newStatus.latencyMs,
        };

        const updatedData = [...prevData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleGenerateTitles = async () => {
    setIsGeneratingTitles(true);
    try {
      const result = await generateStreamTitles({ streamContentDescription });
      setGeneratedTitles(result.suggestedTitles);
      setGeneratedDescription(result.suggestedDescription);
      toast({
        title: "AI Titles Generated",
        description: "Suggested titles and descriptions are ready!",
      })
    } catch (error: any) {
      console.error("Error generating stream titles:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  const handleStartStream = async () => {
    setIsStartingStream(true);
    try {
      await startStream();
      setStreamStatus((prev) => ({ ...prev, isLive: true }));
      toast({
        title: "Stream Started",
        description: "The live stream has been successfully started.",
      })
    } catch (error: any) {
      console.error("Error starting stream:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setIsStartingStream(false);
    }
  };

  const handleStopStream = async () => {
    setIsStoppingStream(true);
    try {
      await stopStream();
      setStreamStatus((prev) => ({ ...prev, isLive: false }));
      toast({
        title: "Stream Stopped",
        description: "The live stream has been successfully stopped.",
      })
    } catch (error: any) {
      console.error("Error stopping stream:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } finally {
      setIsStoppingStream(false);
    }
  };

  const chartConfig = {
    bitrate: {
      label: "Bitrate (kbps)",
      color: "hsl(var(--chart-1))",
    },
    fps: {
      label: "FPS",
      color: "hsl(var(--chart-2))",
    },
    latency: {
      label: "Latency (ms)",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <SidebarProvider>
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar>
        <SidebarHeader>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icons.home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icons.settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Firebase Studio
          </p>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4 md:pl-[16rem]">
        <Card>
          <CardHeader>
            <CardTitle>Stream Status</CardTitle>
            <CardDescription>
              Current status of the live stream.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTitle>
                {streamStatus.isLive ? "Live" : "Offline"}
              </AlertTitle>
              <AlertDescription>
                {streamStatus.isLive
                  ? `Bitrate: ${streamStatus.bitrateKbps} kbps, FPS: ${streamStatus.fps}, Latency: ${streamStatus.latencyMs} ms`
                  : "Stream is currently offline."}
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <p>
                <strong>RTMP Key:</strong> {rtmpKey}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Stream Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Player rtmpKey={rtmpKey} />
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bitrate</CardTitle>
              <CardDescription>
                Real-time bitrate of the stream.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <Recharts.LineChart data={chartData}>
                  <Recharts.XAxis dataKey="time" />
                  <Recharts.YAxis />
                  <Recharts.Tooltip content={<ChartTooltipContent />} />
                  <Recharts.Line
                    type="monotone"
                    dataKey="bitrate"
                    stroke="hsl(var(--chart-1))"
                    dot={false}
                  />
                </Recharts.LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FPS</CardTitle>
              <CardDescription>
                Real-time frames per second of the stream.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <Recharts.LineChart data={chartData}>
                  <Recharts.XAxis dataKey="time" />
                  <Recharts.YAxis />
                  <Recharts.Tooltip content={<ChartTooltipContent />} />
                  <Recharts.Line
                    type="monotone"
                    dataKey="fps"
                    stroke="hsl(var(--chart-2))"
                    dot={false}
                  />
                </Recharts.LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latency</CardTitle>
              <CardDescription>
                Real-time latency of the stream.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <Recharts.LineChart data={chartData}>
                  <Recharts.XAxis dataKey="time" />
                  <Recharts.YAxis />
                  <Recharts.Tooltip content={<ChartTooltipContent />} />
                  <Recharts.Line
                    type="monotone"
                    dataKey="latency"
                    stroke="hsl(var(--chart-3))"
                    dot={false}
                  />
                </Recharts.LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Stream Controls</CardTitle>
            <CardDescription>
              Start or stop the live stream.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                onClick={handleStartStream}
                disabled={streamStatus.isLive || isStartingStream}
              >
                {isStartingStream ? "Starting..." : "Start Stream"}
              </Button>
              <Button
                onClick={handleStopStream}
                disabled={!streamStatus.isLive || isStoppingStream}
              >
                {isStoppingStream ? "Stopping..." : "Stop Stream"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>AI Stream Title Generator</CardTitle>
            <CardDescription>
              Generate engaging stream titles and descriptions using AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="stream-content">Stream Content Description</Label>
              <Textarea
                id="stream-content"
                placeholder="Describe the content of your stream..."
                value={streamContentDescription}
                onChange={(e) => setStreamContentDescription(e.target.value)}
              />
            </div>
            <Button
              className="mt-4"
              onClick={handleGenerateTitles}
              disabled={isGeneratingTitles}
            >
              {isGeneratingTitles ? "Generating..." : "Generate Titles"}
            </Button>

            {generatedTitles.length > 0 && (
              <div className="mt-4">
                <h3>Suggested Titles:</h3>
                <ul>
                  {generatedTitles.map((title, index) => (
                    <li key={index}>{title}</li>
                  ))}
                </ul>
                {generatedDescription && (
                  <div>
                    <h3>Suggested Description:</h3>
                    <p>{generatedDescription}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default StreamDashboard;
